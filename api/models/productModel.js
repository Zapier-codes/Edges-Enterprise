const { pool } = require('../db')
const { validate } = require('../utils/validate')

exports.findAll = async () => {
    const { rows } = await pool.query('select * from products order by created_at desc')
    return rows
}

exports.findById = async (id) => {
    const { rows } = await pool.query('select * from products where id = $1', [id])
    return rows[0] || null
}

exports.create = async (data) => {
    validate([
        { name: 'name', value: data.name, required: true, minLength: 4, maxLength: 255 },
        { name: 'description', value: data.description, required: true, minLength: 4, maxLength: 255 },
        { name: 'url', value: data.url, required: true },
    ])
    const { rows } = await pool.query(
        `insert into products (name, description, url) values ($1, $2, $3) returning *`,
        [data.name, data.description, data.url]
    )
    return rows[0]
}

exports.updateById = async (id, data) => {
    const existing = await exports.findById(id)
    if (!existing) return null
    const merged = { ...existing, ...data }
    validate([
        { name: 'name', value: merged.name, required: true, minLength: 4, maxLength: 255 },
        { name: 'description', value: merged.description, required: true, minLength: 4, maxLength: 255 },
        { name: 'url', value: merged.url, required: true },
    ])
    const { rows } = await pool.query(
        `update products set name=$1, description=$2, url=$3 where id=$4 returning *`,
        [merged.name, merged.description, merged.url, id]
    )
    return rows[0]
}

exports.deleteById = async (id) => {
    const { rowCount } = await pool.query('delete from products where id = $1', [id])
    return rowCount
}
