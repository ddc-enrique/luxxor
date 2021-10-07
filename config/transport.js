const nodemailer = require('nodemailer')

const transport = nodemailer.createTransport({
    port: 465,
    host: 'smtp.gmail.com',
    auth: {
        user: process.env.MAIL,
        pass: process.env.PASSWORD,
    },
    tls: { rejectUnauthorized: false }
})
module.exports= transport