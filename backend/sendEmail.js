const nodemailer = require("nodemailer");
require("dotenv").config(); // Load environment variables

async function sendVerificationEmail(userEmail, verificationToken) {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: userEmail,
    subject: "Email Verification",
    text: `Please verify your email by clicking the following link: 
     http://localhost:3000/verify-email?token=${verificationToken}`, // Point to frontend route
    //http://localhost:8800/verify-email?token=${verificationToken}`, //create page for this
  };
  console.log(userEmail);
  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent");
  } catch (error) {
    console.error("Error sending email:", error);
  }
}

module.exports = sendVerificationEmail;
