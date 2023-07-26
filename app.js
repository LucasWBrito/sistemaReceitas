const express = require('express');
const session = require('express-session');

const usuarioRouter = require('./routes/usuarioRouter');
const receitaRouter = require('./routes/receitaRouter');
const ingredienteRouter = require('./routes/ingredienteRouter');
const unidadeRouter = require('./routes/unidadeRouter');
const sequelize = require('./db/sequelize');

const app = express();

app.use(express.static('public'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

app.set('view engine', 'ejs');
app.use(session({secret: 'senha', resave: true, saveUninitialized: true}));

app.use(receitaRouter);
app.use(usuarioRouter);
app.use('/admin', ingredienteRouter);
app.use('/admin', unidadeRouter);

sequelize.authenticate();

module.exports = app;
