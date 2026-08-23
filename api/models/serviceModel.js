const { pool } = require('../db')
const { validate } = require('../utils/validate')

exports.findAll = async () => {
    const { rows } = await pool.query('select * from services order by created_at desc')
    return rows
}

// `populate` mirrors the old .populate('testimonials') call — attaches the
// service's testimonials (with the reviewer's name) onto the returned row.
exports.findById = async (id, populate) => {
    const { rows } = await pool.query('select * from services where id = $1', [id])
    const service = rows[0]
    if (!service) return null

    if (populate === 'testimonials') {
        const { rows: testimonials } = await pool.query(
            `select t.id, t.review, t.rating, t.created_at, u.id as user_id, u.name as user_name
             from testimonials t join users u on u.id = t.user_id
             where t.service_id = $1 order by t.created_at desc`,
            [id]
        )
        service.testimonials = testimonials
    }
    return service
}

exports.findTopRated = async () => {
    const { rows } = await pool.query('select * from services order by avg_rating desc limit 1')
    return rows[0] || null
}

exports.create = async (data) => {
    const features = data.features || []
    validate([
        { name: 'name', value: data.name, required: true, minLength: 4, maxLength: 255 },
        { name: 'description', value: data.description, required: true, minLength: 7 },
        { name: 'features', value: features, isArray: true },
    ])
    const { rows } = await pool.query(
        `insert into services (name, description, image, features, technologies)
         values ($1, $2, $3, $4, $5) returning *`,
        [data.name, data.description, data.image || null, JSON.stringify(features), data.technologies || []]
    )
    return rows[0]
}

exports.updateById = async (id, data) => {
    const existing = await exports.findById(id)
    if (!existing) return null
    const merged = { ...existing, ...data }
    validate([
        { name: 'name', value: merged.name, required: true, minLength: 4, maxLength: 255 },
        { name: 'description', value: merged.description, required: true, minLength: 7 },
    ])
    const { rows } = await pool.query(
        `update services set name=$1, description=$2, image=$3, features=$4, technologies=$5
         where id=$6 returning *`,
        [
            merged.name,
            merged.description,
            merged.image || null,
            JSON.stringify(merged.features || []),
            merged.technologies || [],
            id,
        ]
    )
    return rows[0]
}

exports.deleteById = async (id) => {
    const { rowCount } = await pool.query('delete from services where id = $1', [id])
    return rowCount
}
