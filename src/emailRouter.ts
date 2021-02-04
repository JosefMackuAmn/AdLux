import express, { Request, Response } from 'express';
import { body, validationResult } from 'express-validator';

import { sendMail } from './sendMail';

const router = express.Router();

router.post('/email', [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name must not be empty')
        .escape()
        .isString()
        .isLength({ min: 5 })
        .withMessage('Name must be a string with a minimum of 5 characters'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email must not be empty')
        .isEmail()
        .normalizeEmail()
        .withMessage('Email must be a valid email'),
    body('message')
        .trim()
        .notEmpty()
        .withMessage('Message must not be empty')
        .escape()
        .isString()
        .isLength({ min: 20 })
        .withMessage('Message must be a string with a minimum of 20 characters')
], async (
    req: Request,
    res: Response
) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).send(JSON.stringify({
            success: false,
            errors: errors.array()
        }));
    }

    const { name, email, message } = req.body;

    const mailDetails = {
        from: process.env.MAIL_USER,
        to: 'adlux@email.cz',
        subject: 'Zpráva z webu AdLux',
        replyTo: email,
        text: (
            message + '\n' +
            '\n' +
            name + '\n' +
            email
        )
    }

    try {
        await sendMail(mailDetails);

        return res
            .status(200)
            .send(JSON.stringify({ success: true }));

    } catch (err) {
        console.log('---------------------------------------');
        console.log('Sending mail failed');
        console.log(err);
        console.log('---------------------------------------');

        return res
            .status(503)
            .send(JSON.stringify({ success: false }));
    }

});

export { router as emailRouter };