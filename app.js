const express = require('express');
const path = require('path');
const session = require('express-session');
const connection = require('./database/database');
const checkLogin = require('./middleware/checkLogin');

// Models
const Usuario = require('./models/usuario');
const Veiculo = require('./models/veiculo');
const Marca = require('./models/marca');
const Proprietario = require('./models/proprietario');
const Categoria = require('./models/categoria');


// Import de rotas
const usuarioRoute = require('./routes/usuarioRoute');
const categoriaRoute = require('./routes/categoriaRoute');
const marcaRoute = require('./routes/marcaRoute');
const proprietarioRoute = require('./routes/proprietarioRoute');
const veiculoRoute = require('./routes/veiculoRoute');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Sessions
app.use(session({
    secret: 'VeiculosApp',
    cookie: {
        maxAge: 1200000,
    },
    resave: false,
    saveUninitialized: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

// Banco de Dados
connection
    .authenticate()
    .then(() => {
        console.log('Conexao feita com sucesso');
    })
    .catch(erro => {
        console.log('Problemas de conexao.');
    });

// Rotas
app.use('/usuarios', usuarioRoute);
app.use('/categorias', categoriaRoute);
app.use('/marcas', marcaRoute);
app.use('/proprietarios', proprietarioRoute);
app.use('/veiculos', veiculoRoute);

app.get('/', checkLogin, (req, res, next) => {
    res.render('index');
});

app.use((req, res, next) => {
    res.render('404');
})

// usuario admin@admin.com
// senha admin@2

module.exports = app;
