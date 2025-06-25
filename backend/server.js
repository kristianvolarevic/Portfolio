const express = require("express");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.post("/send-email", async (req, res) => {
  const { name, email, subject, message } = req.body;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "kristianvolarevic04@gmail.com",
      pass: "tcaz jvdd mxvi koyi ",
    },
  });

  const mailOptions = {
    from: email,
    to: "kristianvolarevic04@gmail.com",
    subject: subject,
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send({ message: "Email sent successfully" });
  } catch (err) {
    res.status(500).send({ message: "Email failed to send", error: err });
  }
});

app.listen(PORT, () => console.log(`Sever running on port ${PORT}`));
