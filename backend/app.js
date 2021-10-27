'use strict'

//Cargar modulos de node para crear servidor

var express = require('express');
//var bodyParser = require('body-parser');


//Ejecutar express (http)
var app = express();
//Cargar ficheros rutas
var article_routes = require('./routes/article')

//Middlewares 

app.use(express.urlencoded({extended:false}));
app.use(express.json());
//CORS

//añadir prefijos a rutas
app.use('/api',article_routes)

//Exportar modulo (fichero actual)
module.exports = app;