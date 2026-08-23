const AppError = require('./AppError')

// Small stand-in for the Mongoose schema validation the models used to get for free.
// Throws a 400 AppError (same shape the error controller already handles) on the first failure.
function validate(fields) {
    for (const f of fields) {
        const { value, name, required, minLength, maxLength, isArray } = f
        const missing = value === undefined || value === null || value === ''
        if (required && missing) {
            throw new AppError(`${name} is required`, 400)
        }
        if (missing) continue

        if (isArray) {
            if (!Array.isArray(value) || value.length === 0) {
                throw new AppError(`At least one ${name.replace(/s$/, '')} is required`, 400)
            }
            continue
        }
        if (typeof value === 'string') {
            if (minLength && value.length < minLength)
                throw new AppError(`${name} must be at least ${minLength} characters`, 400)
            if (maxLength && value.length > maxLength)
                throw new AppError(`${name} must be at most ${maxLength} characters`, 400)
        }
    }
}

module.exports = { validate }
