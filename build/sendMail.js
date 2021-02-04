"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendMail = void 0;
var nodemailer_1 = __importDefault(require("nodemailer"));
var transporter = nodemailer_1.default.createTransport({
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
var sendMail = function (mailDetails) {
    return new Promise(function (resolve, reject) {
        transporter.sendMail(mailDetails, function (err, info) {
            if (err) {
                reject(err);
            }
            else {
                resolve(info);
            }
        });
    });
};
exports.sendMail = sendMail;
