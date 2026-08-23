const { pool } = require('../db')
const { validate } = require('../utils/validate')

exports.findAll = async () => {
    const { rows } = await pool.query('select * from jobs order by created_at desc')
    return rows
}

exports.findById = async (id) => {
    const { rows } = await pool.query('select * from jobs where id = $1', [id])
    return rows[0] || null
}

exports.create = async (data) => {
    validate([
        { name: 'name', value: data.name, required: true, minLength: 4, maxLength: 255 },
        { name: 'description', value: data.description, required: true, minLength: 7 },
        { name: 'responsibilities', value: data.responsibilities, isArray: true },
        { name: 'requirements', value: data.requirements, isArray: true },
    ])
    const { rows } = await pool.query(
        `insert into jobs (name, description, responsibilities, requirements)
         values ($1, $2, $3, $4) returning *`,
        [data.name, data.description, data.responsibilities || [], data.requirements || []]
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
        `update jobs set name=$1, description=$2, responsibilities=$3, requirements=$4
         where id=$5 returning *`,
        [merged.name, merged.description, merged.responsibilities || [], merged.requirements || [], id]
    )
    return rows[0]
}

exports.deleteById = async (id) => {
    const { rowCount } = await pool.query('delete from jobs where id = $1', [id])
    return rowCount
}
