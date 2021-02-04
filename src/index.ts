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