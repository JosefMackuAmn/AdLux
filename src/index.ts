import express from 'express';
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
})

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
    console.log('Listening on port 8080');
});