const Users = require("../models/userModel");
const catchAsync = require("./../utils/catchAsync");
const upload = require("./../utils/multerConfig");
const sharp = require("sharp");

exports.uploadUserImage = upload.single("image");

exports.resizeUserImage = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.fileName = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.fileName}`);
  next();
});

// NOTE: the old Mongo-operator-style filtering (gt/gte/lt/lte via APIFeatures) is gone —
// this is an internal staff listing, not a public search endpoint, so it just supports
// pagination via ?page & ?limit. Say the word if query filtering needs to come back.
exports.getAll = catchAsync(async (req, res, next) => {
  let doc = await Users.findAll({ activeOnly: true });

  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 100;
  const start = (page - 1) * limit;
  doc = doc.slice(start, start + limit);

  return res.status(200).json({
    status: "success",
    totalResults: doc.length,
    data: {
      doc,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  const doc = await Users.deactivate(req.user.id);
  return res.status(204).json({
    status: "success",
    data: {
      doc,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.fileName;
  const doc = await Users.updateById(req.user.id, req.body);
  return res.status(200).json({
    status: "success",
    data: {
      doc,
    },
  });
});
