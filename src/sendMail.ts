import nodemailer, { SentMessageInfo, SendMailOptions } from 'nodemailer';

const transporter = nodemailer.createTransport({
    service: process.env.MAIL_SERV,
    auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS
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