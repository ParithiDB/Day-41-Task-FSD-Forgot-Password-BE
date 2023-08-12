const loginRouter = require('express').Router();
const userModel = require('../models/Users.models');
const { comparePasswords, generateToken } = require('../utils/Auth.utils');


loginRouter.post("/", async (req, res, next) => {
  const { mail, password } = req.body;
  userModel.findOne({ mail: mail })
    .then(async (response) => {
      if (response && response._id) {
        const isMatching = await comparePasswords(password, response.password);
        if (isMatching) {
          const newToken = generateToken({
            name: response.name,
            role: ['admin']
          },
            `${process.env.JWT_SECRET_KEY}`
          )
          return res.status(200).json({
            success: true,
            token: newToken,
            message: "Login Successful!!",
          });
        } else {
          return res.status(200).json({
            success: false,
            message: "Email or Password is wrong, Try Again!!",
          });
        }
      } else {
        return res.status(200).json({
          success: true,
          message:
            "Account Does not Exists, Please create your account to continue!!",
        });
      }
    })
    .catch((err) => {
      return res.status(401).json({
        success: false,
        message: "Error Fetching Users Data!!!",
        error: err,
      });
    });
});



module.exports = loginRouter;