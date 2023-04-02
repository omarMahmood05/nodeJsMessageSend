const dotenv = require("dotenv-vault-core").config();
const express = require("express");
const bodyParser = require("body-parser");
const nodemailer = require("nodemailer");
const http = require("http");
const PORT = 3000;

const server = express();

server.use(bodyParser.urlencoded({ extended: true }));
server.use(express.static(__dirname + "/public/"));

const transporter = nodemailer.createTransport({
  service: "hotmail",
  auth: {
    user: process.env.MAILID,
    pass: process.env.PASS,
  },
});

server.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

server.post("/", (req, res) => {
  const userName = req.body.userName;
  const message = req.body.userMessage;

  console.log(process.env.MAILID);
  console.log(process.env.PASS);

  const options = {
    from: "omarnodejs@outlook.com",
    to: "omarmahmood005@gmail.com",
    subject: `Recieved a message from your NodeJS Application`,
    text: "You recieved a message from " + userName + ". The message is " \n + message,
  };

  transporter.sendMail(options, (err, info) => {
    if (!err) {
      res.redirect("/sent");
    } else {
      console.log(err);
    }
  });
});

server.get("/sent", (req, res) => {
  res.sendFile(__dirname + "/sent.html");
});

server.post("/home", (req, res) => {
  res.redirect("/");
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}/`);
});
