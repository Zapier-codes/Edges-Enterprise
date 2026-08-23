const Users = require("./../models/userModel");
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const catchAsync = require("./../utils/catchAsync");
const AppError = require("../utils/AppError");
const Email = require("./../utils/email");
const crypto = require('crypto')


function signToken(id, res) {
  const token = jwt.sign({ id: id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRY,
  });
  const cookieOptions = {
    expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRY * 24 * 60 * 60 * 1000),
    // httpOnly:true
  }
  res.cookie('jwt', token, cookieOptions)
  return token;
}

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await Users.create(req.body);
  const token = signToken(newUser.id, res);

  try {
    await new Email(newUser).sendWelcome();
  } catch (error) {
    console.log(error);
  }

  return res.status(200).json({
    status: "success",
    token: token,
    data: {
      name: newUser.name,
      id: newUser.id,
      role: newUser.role,
    },
  });
});

exports.login = catchAsync(async (req, res, next) => {
  if (!req.body.email || !req.body.password)
    return next(new AppError("Please provide both email and password!", 400));

  const found = await Users.findByEmailWithPassword(req.body.email);
  if (!found) return next(new AppError("Please provide valid email!", 400));

  if (!(await Users.correctPassword(req.body.password, found.password_hash)))
    return next(new AppError("Please provide valid email and password!", 400));

  const updated = await Users.updateById(found.id, { isActive: true });
  const token = signToken(found.id, res);

  return res.status(200).json({
    status: "success",
    data: {
      id: found.id,
      name: found.name,
      token: token,
      role: found.role
    },
  });
});

exports.protect = catchAsync(async (req, res, next) => {
  const token = req.cookies.jwt || req.header("x-auth-token");
  if (!token) return next(new AppError("Please provide auth token!", 401));

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
  const found = await Users.findByIdWithPassword(decoded.id);
  if (!found) return next(new AppError("User not exists!", 401));

  if (Users.checkPasswordChangedAfter(found, decoded.iat))
    return next(new AppError("User changed the password!", 401));

  if (!found.is_active)
    return next(new AppError("User no longer exists! Login to activate your account again", 403));

  req.user = Users.toPublic(found);
  next();
});

exports.restriction = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role))
      return next(new AppError("Access denied!", 403));
    next();
  };
};


exports.forgotPassword = catchAsync(async (req, res, next) => {
  if (!req.body.email)
    return next(new AppError("Please provide an email!", 404));

  const found = await Users.findByEmail(req.body.email);
  if (!found) return next(new AppError("Please provide a valid email!", 404));

  const resetToken = await Users.createPasswordResetToken(found.id);
  try {
    const url = `${process.env.FRONTEND_URL}/resetPassword/${resetToken}`;
    await new Email(found).sendResetPassword(url);
    res.status(200).json({
      status: "success",
      message: "Password reset token sent",
    });
  } catch (error) {
    await Users.clearPasswordResetToken(found.id);
    next(
      new AppError("Email not sent for password reset!Try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.resetToken)
    .digest("hex");
  const found = await Users.findByResetToken(hashedToken);
  if (!found)
    return next(new AppError("Token is invalid or expired!", 400))

  await Users.setPassword(found.id, req.body.password, req.body.confirmPassword)
  const token = signToken(found.id, res)
  res.status(200).json({
    status: 'success',
    token: token
  })
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  if (!req.body.oldPassword)
    return next(new AppError("Please provide your old password!", 400))

  const found = await Users.findByIdWithPassword(req.user.id);
  if (!await Users.correctPassword(req.body.oldPassword, found.password_hash))
    return next(new AppError("Old password is incorrect!", 400))

  await Users.setPassword(found.id, req.body.password, req.body.confirmPassword)

  const token = signToken(found.id, res)
  res.status(200).json({
    status: 'success',
    token: token,
  })
})
