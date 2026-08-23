const testimonial = require("../models/testimonialModel");
const catchAsync = require("../utils/catchAsync");

exports.getAll = catchAsync(async (req, res, next) => {
    const doc = await testimonial.findAll();

    return res.status(200).json({
        status: 'success',
        totalResults: doc.length,
        data: {
            doc
        }
    })
})
