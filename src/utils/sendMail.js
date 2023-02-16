const nodemailer = require("nodemailer")

const sendMail = async ({ to, subject, body }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
            user: process.env.SMTP_MAIL,
            pass: process.env.SMTP_PASS
        }
    });

    await transporter.sendMail({
        from: 'Plant House <info@planthouse.com>',
        to: to,
        subject: subject,
        html: body
    });
}

module.exports = sendMail