const userModel = require("../model/userModel");
const AppError = require("../utils/appError");
const catchErrorAsync = require("../utils/catchUtil");
const jwtToken = require("../utils/jwtToken");
const bcrypt = require("bcrypt");

const registerUser = catchErrorAsync(async (req, res, next) => {
   const { name, email, password, pic } = req.body;

   //    const HashPassword = await bcrypt.hash(password, 10);
   const userExist = await userModel.findOne({ email });
   if (userExist) {
      return next(new AppError("bunday user allaqachon mavjud`"));
   }

   const hashPassword = await bcrypt.hash(password, 10);
   const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      pic,
   });
   jwtToken(user, 200, res);
});


const Login = catchErrorAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
     return next(new AppError("siz email yoki passwordni kiritmadiz"));
  }

  const user = await userModel.findOne({ email });

  if (!user) {
     return next(new AppError("bunday user mavjud emas"));
  }

  const comparePassword = await bcrypt.compare(password, user.password);
  if (!comparePassword) {
     return next(new AppError("parol yoki email xato", 401));
  }
  jwtToken(user, 200, res);
});

module.exports = { registerUser,Login };
