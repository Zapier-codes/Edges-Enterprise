const { pool } = require('../db')
const AppError = require('../utils/AppError')

const BASE_SELECT = `
    select t.id, t.review, t.rating, t.created_at,
           t.user_id, u.name as user_name,
           t.service_id, s.name as service_name
    from testimonials t
    join users u on u.id = t.user_id
    join services s on s.id = t.service_id
`

exports.findAll = async () => {
    const { rows } = await pool.query(`${BASE_SELECT} order by t.created_at desc`)
    return rows
}

exports.findById = async (id) => {
    const { rows } = await pool.query(`${BASE_SELECT} where t.id = $1`, [id])
    return rows[0] || null
}

exports.create = async (data) => {
    if (!data.review) throw new AppError('Review is required', 400)
    if (data.rating === undefined) throw new AppError('Rating is required', 400)
    if (data.rating < 1 || data.rating > 5) throw new AppError('Rating must be between 1 and 5', 400)
    if (!data.user) throw new AppError('Testimonial must belong to user(client)', 400)
    if (!data.service) throw new AppError('Testimonial must belong to services', 400)

    // avg_rating on the parent service is recalculated by the DB trigger — no app-side hook needed.
    const { rows } = await pool.query(
        `insert into testimonials (review, rating, user_id, service_id)
         values ($1, $2, $3, $4) returning id`,
        [data.review, data.rating, data.user, data.service]
    )
    return exports.findById(rows[0].id)
}

exports.updateById = async (id, data) => {
    const existing = await exports.findById(id)
    if (!existing) return null
    const rating = data.rating ?? existing.rating
    const review = data.review ?? existing.review
    if (rating < 1 || rating > 5) throw new AppError('Rating must be between 1 and 5', 400)

    await pool.query('update testimonials set review=$1, rating=$2 where id=$3', [review, rating, id])
    return exports.findById(id)
}

exports.deleteById = async (id) => {
    const { rowCount } = await pool.query('delete from testimonials where id = $1', [id])
    return rowCount
}
