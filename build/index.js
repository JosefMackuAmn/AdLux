"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var body_parser_1 = __importDefault(require("body-parser"));
var emailRouter_1 = require("./emailRouter");
var app = express_1.default();
app.set('view engine', 'ejs');
app.use(body_parser_1.default.json());
app.use(express_1.default.static('public'));
app.use(emailRouter_1.emailRouter);
app.get('/', function (req, res) {
    res.render('index');
});
app.get('*', function (req, res) {
    res.redirect('/');
});
app.use(function (err, req, res, next) {
    console.log('---------------------------------------');
    console.log('Express error handler: ');
    console.log(err);
    console.log('---------------------------------------');
    res.sendStatus(500);
});
var PORT = process.env.PORT || 8080;
app.listen(PORT, function () {
    console.log('Listening on port 8080');
});
