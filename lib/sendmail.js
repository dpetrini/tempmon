'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // secure:true for port 465, secure:false for port 587
    auth: {
        user: 'dp.domotica@gmail.com',
        pass: 'harmonia.900'
    }
});

module.exports = transporter;

/*
// setup email data with unicode symbols
let mailOptions = {
    from: '"TempMon server 👻" <dp.domotica@gmail.com>', // sender address
    to: 'danielpetrini@yahoo.com.br', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
    //console.log(JSON.stringify(info));
});
*/
