'use strict' //activamos el modo estricto

var mongoose = require('mongoose');
var app = require('./app');
var port = 3900;

//mongoose.set('useFindAndModify', false);
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/api_rest_blog',{ useNewUrlParser:true, useUnifiedTopology: true })
        .then(()=>{
            console.log('la conexión a la base de datos se ha realizado exitosamente ,OK');

            //Crear servidor 
            app.listen(port, ()=>{
                console.log('Servidor corriendo en http://localhost:'+port);
            });
        });
        


