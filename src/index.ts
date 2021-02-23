import fs from 'fs';
import path from 'path';
import express, { Request, Response, NextFunction } from 'express';
import bodyParser from 'body-parser';

import { emailRouter } from './emailRouter';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));

app.use(emailRouter);

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/gdpr', (req, res) => {
    const gdprPath = path.join('public', 'pdf', 'adlux_gdpr.pdf');
    const fileStream = fs.createReadStream(gdprPath);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="adlux_gdpr.pdf"');

    fileStream.pipe(res);
})

app.get('*', (req, res) => {
    res.redirect('/');
});

app.use((
    err: any,
    req: Request,
    res: Response,
    next: NextFunction
) => {
    console.log('---------------------------------------');
    console.log('Express error handler:');
    console.log(err);
    console.log('---------------------------------------');

    res.sendStatus(500);
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Listening on port 8080');
});