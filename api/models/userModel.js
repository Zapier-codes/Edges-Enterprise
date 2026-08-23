const bcrypt = require('bcrypt')
const crypto = require('crypto')
const validator = require('validator')
const { pool } = require('../db')
const AppError = require('../utils/AppError')

const SALT_ROUNDS = 12
const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])[A-Za-z\d\W_]+$/

// Strips password_hash / reset-token internals before a row goes back to the client —
// equivalent to the old schema's `select: false` fields.
function toPublic(row) {
    if (!row) return row
    const { password_hash, password_reset_token, password_reset_token_expires, ...rest } = row
    return rest
}
exports.toPublic = toPublic

exports.findAll = async ({ activeOnly = true } = {}) => {
    const { rows } = activeOnly
        ? await pool.query('select * from users where is_active = true order by name')
        : await pool.query('select * from users order by name')
    return rows.map(toPublic)
}

// `populate` mirrors the old .populate('testimonials') virtual on users —
// called positionally as findById(id, 'testimonials') via handlerFactory's getOne(Model, options).
exports.findById = async (id, populate) => {
    const { rows } = await pool.query('select * from users where id = $1', [id])
    const row = rows[0]
    if (!row) return null
    const user = toPublic(row)

    if (populate === 'testimonials') {
        const { rows: testimonials } = await pool.query(
            `select t.id, t.review, t.rating, t.created_at, t.service_id, s.name as service_name
             from testimonials t join services s on s.id = t.service_id
             where t.user_id = $1 order by t.created_at desc`,
            [id]
        )
        user.testimonials = testimonials
    }
    return user
}

// Internal-only: includes password_hash / reset-token fields. Never return this
// straight from a route — used by authController for login/protect/updatePassword.
exports.findByIdWithPassword = async (id) => {
    const { rows } = await pool.query('select * from users where id = $1', [id])
    return rows[0] || null
}

exports.findByEmail = async (email) => {
    const { rows } = await pool.query('select * from users where email = $1', [email])
    return rows[0] ? toPublic(rows[0]) : null
}

exports.findByEmailWithPassword = async (email) => {
    const { rows } = await pool.query('select * from users where email = $1', [email])
    return rows[0] || null
}

exports.findByResetToken = async (hashedToken) => {
    const { rows } = await pool.query(
        `select * from users where password_reset_token = $1 and password_reset_token_expires > now()`,
        [hashedToken]
    )
    return rows[0] || null
}

function validatePassword(password, confirmPassword) {
    if (!password || password.length < 7)
        throw new AppError('password must be at least 7 characters', 400)
    if (!PASSWORD_REGEX.test(password))
        throw new AppError(
            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character.',
            400
        )
    if (password !== confirmPassword) throw new AppError('Passwords are not same', 400)
}

exports.create = async (data) => {
    if (!data.name || data.name.length < 4 || data.name.length > 30)
        throw new AppError('name is required (4-30 characters)', 400)
    if (!data.email || !validator.isEmail(data.email))
        throw new AppError('Email should be valid', 400)
    validatePassword(data.password, data.confirmPassword)

    const passwordHash = await bcrypt.hash(data.password, SALT_ROUNDS)
    const role = ['admin', 'employee', 'client'].includes(data.role) ? data.role : 'employee'

    try {
        const { rows } = await pool.query(
            `insert into users (name, email, password_hash, role)
             values ($1, $2, $3, $4) returning *`,
            [data.name, data.email, passwordHash, role]
        )
        return toPublic(rows[0])
    } catch (err) {
        if (err.code === '23505') throw new AppError('Email is already registered', 400)
        throw err
    }
}

exports.updateById = async (id, data) => {
    const existing = await exports.findById(id, { includePassword: true })
    if (!existing) return null

    const name = data.name ?? existing.name
    const image = data.image ?? existing.image
    const isActive = data.isActive ?? existing.is_active

    const { rows } = await pool.query(
        `update users set name=$1, image=$2, is_active=$3 where id=$4 returning *`,
        [name, image, isActive, id]
    )
    return toPublic(rows[0])
}

exports.setPassword = async (id, password, confirmPassword) => {
    validatePassword(password, confirmPassword)
    const passwordHash = await bcrypt.hash(password, SALT_ROUNDS)
    const { rows } = await pool.query(
        `update users
         set password_hash=$1, last_changed_password=now(), password_reset_token=null, password_reset_token_expires=null
         where id=$2 returning *`,
        [passwordHash, id]
    )
    return toPublic(rows[0])
}

exports.deleteById = async (id) => {
    // soft delete, same as the old deleteMe (isActive=false) — hard delete for admin removal
    const { rowCount } = await pool.query('delete from users where id = $1', [id])
    return rowCount
}

exports.deactivate = async (id) => {
    const { rows } = await pool.query(
        `update users set is_active=false where id=$1 returning *`,
        [id]
    )
    return toPublic(rows[0])
}

exports.clearPasswordResetToken = async (id) => {
    await pool.query(
        `update users set password_reset_token=null, password_reset_token_expires=null where id=$1`,
        [id]
    )
}

exports.correctPassword = async (candidate, passwordHash) => bcrypt.compare(candidate, passwordHash)

exports.checkPasswordChangedAfter = (user, jwtTimestamp) => {
    if (!user.last_changed_password) return false
    return user.last_changed_password.getTime() / 1000 > jwtTimestamp
}

exports.createPasswordResetToken = async (id) => {
    const resetToken = crypto.randomBytes(32).toString('hex')
    const hashed = crypto.createHash('sha256').update(resetToken).digest('hex')
    const expires = new Date(Date.now() + 10 * 60 * 1000) // 10 minutes
    await pool.query(
        `update users set password_reset_token=$1, password_reset_token_expires=$2 where id=$3`,
        [hashed, expires, id]
    )
    return resetToken
}
