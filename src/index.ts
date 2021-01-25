import express from 'express';
import bodyParser from 'body-parser';

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(express.static('public'));

app.post('/email', (req, res) => {
    // Send email
    res.send(JSON.stringify({
        success: true
    }));
});

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