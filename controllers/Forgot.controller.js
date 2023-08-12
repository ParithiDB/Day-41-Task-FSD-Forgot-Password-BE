const forgotRouter = require('express').Router();
const userModel = require('../models/Users.models');
const nodemailer = require('nodemailer');


forgotRouter.put('/', async (req, res, next) => {
    const { mail } = req.body;
    await userModel.findOne({ mail })
      .then(async (response) => {
        if (response && response._id) {
          const randomString = Math.random().toString(36).substring(2, 15) +
            Math.random().toString(36).substring(2, 15);
          response.resetToken = randomString;
          await userModel.updateOne({ mail: mail }, response, { upsert: true, new: true });
          var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: `${process.env.NODEMAILER_EMAIL_ADDRESS}`,
              pass: `${process.env.NODEMAILER_PASSWORD}`
            }
          });
          const NODEMAILER_RESET_URL =  `http://localhost:5000/ResetPassword/${randomString}`;
          
          var mailOptions = {
            from: '"myself" <yoyomobiles98@gmail.com>',
            to: response.mail,
            subject: 'Reset Password',
            text: NODEMAILER_RESET_URL
          };
  
          transporter.sendMail(mailOptions, function (error, info) {
            console.log(mailOptions);
            if (error) {
              return res.status(401).json({
                success : false,
                message : "Cannot send Email. Please check your internet connection and try again"
              })
            } else {
              return res.status(200).json({
                success: true,
                message: "Email sent"
              })
            }
          });
        }
        else {
          return res.status(401).json({
            success: false,
            message: "Invalid Email"
          })
        }
      })
  });


  module.exports = forgotRouter;