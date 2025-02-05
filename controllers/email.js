const nodemailer = require("nodemailer");
require("dotenv").config();

const sendMail = async (req, res) => {
  const {
    fullName,
    email,
    physicalAddress,
    city,
    state,
    postalCode,
    complaint,
    url,
    signature,
    date,
  } = req.body;

  //test
  // const transporter = nodemailer.createTransport({
  //   //   user: "pescosannita2021@gmail.com",
  //   host: "mxslurp.click",
  //   port: 2525,
  //   secure: false,
  //   auth: {
  //     user: "user",
  //     pass: "password",
  //   },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
  //   logger: true,
  //   debug: true,
  // });
  // funziona ma mi devo fare dare la password dal tizio
  const transporter = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    secure: false,
    port: 587,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  const mailOptions = {
    from: process.env.EMAIL_ARIS,
    to: process.env.EMAIL_ARIS,
    subject: "New Complaint Submission",
    text: `
      From: ${email}
      Full Name: ${fullName}
      Email: ${email}
      Address: ${physicalAddress}, ${city}, ${state}, ${postalCode}
      Complaint: ${complaint}
      URL: ${url}
      Signature: ${signature}
      Date: ${date}
    `,
  };
  //da fare meglio

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully!");
  } catch (error) {
    console.error(error);
    res.status(500).send("Failed to send email.");
  }
};

module.exports = {
  sendMail,
};
