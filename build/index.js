"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
//import bodyParser from 'body-parser';
var app = express_1.default();
app.set('view engine', 'ejs');
//app.use(bodyParser.json());
app.use(express_1.default.static('public'));
app.post('/email', function (req, res) {
    // Send email
    res.send('Not implemented yet');
});
app.get('/', function (req, res) {
    res.render('index');
});
app.get('*', function (req, res) {
    res.redirect('/');
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('Listening on port 8080');
});
