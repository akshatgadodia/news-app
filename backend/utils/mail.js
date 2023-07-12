const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com", // hostname smtp.live.com //smtp-mail.outlook.com
  //secureConnection: false, // TLS requires secureConnection to be false
  port: 587, // port for secure SMTP
  //tls: {
  //ciphers:'SSLv3'
  //},
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASSWORD,
  },
});

const sendAccountApprovedMail = async (data) => {
  try {
    let sendResult = await transporter.sendMail({
      from: "Drunken Bytes <bytes.drunken@hotmail.com>",
      to: `${data.email}`,
      subject: `Welcome to News Website`,
      text: `Dear ${data.name},

      Thank you for choosing News Website. 

      Subscribe to our plans to get the latest news on your email.
      
      Best regards,
      News Website Team`,
      html: `<div><p>
        Dear ${data.name},
      </p>
      <p>
      Thank you for choosing News Website. 
      </p>
      <p>
      Subscribe to our plans to get the latest news on your email.
      </p>
      <p>
        Best regards,<br>
        News Website Team
      </p></div>`,
    });
    //   console.log(sendResult);
  } catch (err) {
    console.log(err);
  }
};

module.exports = { sendAccountApprovedMail };
