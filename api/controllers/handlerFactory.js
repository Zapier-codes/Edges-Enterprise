const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");

exports.getAll = (Repo) => catchAsync(async (req, res, next) => {
    const doc = await Repo.findAll();

    return res.status(200).json({
        status: 'success',
        totalResults: doc.length,
        data: {
            doc
        }
    })
})
exports.getOne = (Repo, ...options) => catchAsync(async (req, res, next) => {
    const doc = options.length > 0
        ? await Repo.findById(req.params.id, options[0])
        : await Repo.findById(req.params.id);

    if (!doc) {
        return next(new AppError('Doc not found matching this id!', 404))
    }
    return res.status(200).json({
        status: 'success',
        data: {
            doc
        }
    })
})
exports.createOne = Repo => catchAsync(async (req, res, next) => {

    const doc = await Repo.create(req.body);
    return res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    })
})
exports.updateOne = Repo => catchAsync(async (req, res, next) => {
    const found = await Repo.updateById(req.params.id, req.body);
    if (!found) {
        return next(new AppError("Document not found matching this id!", 404))
    }

    return res.status(200).json({
        status: 'success',
        data: {
            found
        }
    })
})
exports.deleteOne = Repo => catchAsync(async (req, res, next) => {
    const deletedCount = await Repo.deleteById(req.params.id);
    if (deletedCount < 1) {
        return next(new AppError("Document not found matching this id!", 404))
    }
    return res.status(204).json({
        status: 'success',
        data: null
    })
})
