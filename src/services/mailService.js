const nodemailer = require("nodemailer");
const welcomeEmail = require("../views/emails/welcomeEmail");
const { MailError } = require("../utils/errors");
const { ERROR_MESSAGES } = require("../constants/messages");

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT),
  secure: process.env.EMAIL_SECURE === "true",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


const sendMail = async (to, subject, html) => {
  try {
    const info = await transporter.sendMail({
      from: `${process.env.EMAIL_FROM_NAME || "Testing Team"} <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (err) {
    throw new MailError(ERROR_MESSAGES.EMAIL_SEND_ERROR, err);
  }
};

const sendWelcomeMail = (user) =>
  sendMail(user.email, "Welcome to Our Website!", welcomeEmail(user));

module.exports = {
  sendWelcomeMail,
};
