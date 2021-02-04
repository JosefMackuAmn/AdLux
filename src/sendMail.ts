import nodemailer, { SentMessageInfo, SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
    host: process.env.MAIL_SERV,
    port: 465,
    secure: true,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
    },
    tls: {
        rejectUnauthorized: false
    }
});

// Create promise-wrapper
const sendMail = (mailDetails: SendMailOptions) => {
    return new Promise((resolve, reject) => {

        transporter.sendMail(mailDetails, (err: Error | null, info: SentMessageInfo) => {
            if (err) {
                reject(err);
            } else {
                resolve(info)
            }
        });
    });

}

export { sendMail };