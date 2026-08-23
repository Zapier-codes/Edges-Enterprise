const Services = require("../models/serviceModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const upload = require("./../utils/multerConfig");
const sharp = require("sharp");
const { uploadImage } = require("../utils/supabaseStorage");

exports.getTopRatedService = catchAsync(async (req, res, next) => {
    const found = await Services.findTopRated();
    if (!found)
        return next(new AppError('No document found!', 404))
    res.status(200).json({
        status: 'success',
        result: found
    })
})

exports.uploadServiceImage = upload.single("image");

exports.resizeServiceImage = catchAsync(async (req, res, next) => {
    if (!req.file) return next();
    const fileName = `service-${req.body.name}-${Date.now()}.jpeg`;

    const buffer = await sharp(req.file.buffer)
        .resize(2000, 1333)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toBuffer();

    req.body.image = await uploadImage('service-images', fileName, buffer);
    next();
});

exports.createOne = catchAsync(async (req, res, next) => {
    if (req.file) req.body.image = req.file.fileName;
    // features/technologies may arrive as JSON strings from multipart form-data
    if (typeof req.body.features === 'string') req.body.features = JSON.parse(req.body.features);
    if (typeof req.body.technologies === 'string') req.body.technologies = JSON.parse(req.body.technologies);
    const doc = await Services.create(req.body);
    return res.status(201).json({
        status: 'success',
        data: {
            doc
        }
    })
})
