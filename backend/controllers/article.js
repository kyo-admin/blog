'use stricts'

var validator = require('validator');
const article = require('../models/article');
var Article = require('../models/article');

var controller = {

    datosCurso: (req, res)=>{

        return res.status(200).send({
            curso: 'Master en Frameworks JS',
            autor: 'Claudio Illanes',
            url: 'claudio.cl'
        });
    },

    test: (req,res)=>{
        return res.status(200).send({
            message: 'soy la acción test de mi controlador de articulos' 
        });
    },

    save: (req, res) => {
        //recoger parametros por post
        var params = req.body;
        console.log(params);

        //validar datos(validator)
        try{
            var validate_title = !validator.isEmpty(params.title); 
            var validate_content =!validator.isEmpty(params.content); 
        }catch(err){
            return res.status(200).send({
                status:'error',
                message: 'Faltan datos por enviar'
            });
        }

        if (validate_title && validate_content){
            //return res.status(200).send({
            //    message: "Validacion correcta"
            //});
            //crear el objeto a guardar 
            var article = new Article(); 

            //asignar valores
            article.title = params.title;
            article.content = params.content;
            article.image = null;

            //guardar el articulo

            article.save((err,articleStored)=>{
                if(err|| !articleStored){
                    return res.status(404).send({
                        status: 'error', 
                        message: 'El articulo No se ha guardado'              
                    });
                }
                 //devolver respuesta
                return res.status(200).send({
                    status: 'success', 
                    article: articleStored
                });
            });    

           
        }else{
            return res.status(200).send({
                status:'error',
                message: 'los datos no son validos'
            });
        }
    },

    getArticles: (req, res) => {
        var query = Article.find({});
        var last = req.params.last;
        if(last || last!=undefined){
            query.limit(5);
        }
        //find
        query.sort('_id').exec((err,articles)=>{
            if(err){
                return res.status(500).send({
                    status:'error',
                    message: 'error al devolver los articulos'
                });
            }
            if(!articles){
                return res.status(404).send({
                    status:'error',
                    message: 'No hay articulos para mostrar'
                });
            }
            return res.status(200).send({
                status:'success',
                articles
            });
        });     
    },
    getArticle: (req, res) => {

        //recoger el id de la url
        var articleId = req.params.id;
        //comprobar que existe
        if(!articleId || articleId == null){
            return res.status(404).send({
                status:'error',
                message: 'No existe el articulo'
            });
        }
        //buscar el articulo
        Article.findById(articleId, (err, article)=>{
            
            if(err || !article){
                return res.status(404).send({
                    status:'error',
                    message: 'No existe el articulo'
                });
            }
            //devolver el json
            return res.status(404).send({
                status:'success',
                article
            });
s

        });
  
    },
    update: (req, res)=>{
        //recoger el id del articulo por la url
        var articleId = req.params.id;

        //Recoger los datos que llegan por put
        var params = req.body;
        // validar datos 
        try{
            var validate_title = !validator.isEmpty(params.title);
            var validate_content = !validator.isEmpty(params.content);

        }catch(err){
            return res.status(200).send({
                status: 'error',
                message: 'faltan datos por enviar!!!'
            });
        }
        if(validate_title && validate_content){
            //find and update
            Article.findOneAndUpdate({_id: articleId}, params, {new:true},(err, articleUpdated)=>{
                if(err){
                    return res.status(500).send({
                        status: 'error',
                        message: 'Error al actualizar!!!'              
                    });
                }
                if(!articleUpdated){
                    return res.status(404).send({
                        status: 'error',
                        message: 'No existe el articulo!!!'              
                    });
                }
                return res.status(500).send({
                    status: 'success',
                    article: articleUpdated              
                });
                
            });    
        }else{
            //devolver respuesta
            return res.status(200).send({
                status:'error',
                message: 'La validación no es correcta '
            });
        }
    },
    delete:(req, res) =>{
        //Recoger el id de la url
        var articleId =req.params.id;
        //find and delete
        Article.findOneAndDelete({_id: articleId}, (err, articleRemoved) => {
            if(err){
                return res.status(500).send({
                    status: 'error',
                    message: 'Error al borrar'
                });
            }
            if(!articleRemoved){
                return res.status(404).send({
                    status: 'error',
                    message: 'Nose ha borrado el articulo, posiblemete no exista'
                });
            }
            return res.status(200).send({
                status:'success',
                article:articleRemoved
            });
        });
    }
        
};// end controllers

module.exports = controller;