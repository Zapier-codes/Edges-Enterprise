const { protect } = require("../controllers/authController");
const userModel = require("../models/userModel");
const AppError = require("../utils/AppError");
const catchAsync = require("../utils/catchAsync");
const express = require('express')
const router = express.Router()
const { supabase } = require('./supabaseStorage')

// Images now live in Supabase Storage — service/user records already carry the full
// public URL in their `image` column (see resizeServiceImage/resizeUserImage), so the
// frontend can usually just use that directly. These routes stay only so any existing
// /api/image/... links keep working, by redirecting to the current storage URL.

const getUserImage = catchAsync(async (req, res, next) => {
    const doc = await userModel.findById(req.params.name)
    if (!doc) {
        return next(new AppError('Doc not found matching this id!', 404))
    }
    if (!doc.image || !doc.image.startsWith('http')) {
        return next(new AppError('No image set for this user', 404))
    }
    res.redirect(doc.image)
})

const getServiceImage = catchAsync(async (req, res, next) => {
    const { data } = supabase.storage.from('service-images').getPublicUrl(req.params.name)
    res.redirect(data.publicUrl)
})

router.get('/user/:name', protect, getUserImage)
router.get('/service/:name', getServiceImage)

module.exports = router
