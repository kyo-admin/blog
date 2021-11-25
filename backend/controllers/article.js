'use stricts'

var validator = require('validator');
var fs = require('fs');
var path = require('path');
//const article = require('../models/article');
var Article = require('../models/article');
const { exists } = require('../models/article');

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
            if(params.image){
                article.image = params.image;

            }else{
                article.image = null;

            }

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
        //en "query.sort('-_id').exec((err,articles)=>{" el signo - en -_id ordena del mas reciente o al mas antiguo
        query.sort('-_id').exec((err,articles)=>{
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
            return res.status(200).send({
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
                //return res.status(500).send({
                return res.status(200).send({
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
    },
    //************************************************************** */
    upload: (req, res) => {
        //configurar el modulo connect multiparty router/article.js

        // Recoger el fichero de la peticion
        var file_name = 'Imagen no subida...';

        if(!req.files){
            return res.status(404).send({
                status: 'error',
                message: file_name
            });
        }

        //console.log(req.files);
        //conseguir nombre y la extensión del archivo
        var file_path = req.files.file0.path;
        //console.log(file_path);
        
        var file_split = file_path.split('\\');
        //comprobar la extensión solo imagenes
        //Nombre del archivo
        var file_name = file_split[2];
        //Extension del fichero
        var extension_split = file_name.split('\.');
        var file_ext = extension_split[1];
        //Comprobar La extension, solo imagenes, si es válida borrar el fichero
        if(file_ext != 'png' && file_ext != 'jpg' && file_ext != 'jpeg' && file_ext != 'gif' ){
            //borrar el archivo subido
            fs.unlink(file_path, (err)=>{
                return res.status(200).send({
                    status: 'error',
                    message: 'La extension de la imagen no es válida '
                });
            });
        }else{
            //si todo es valido , sacr id de la url
            var articleId = req.params.id;
            if(articleId){
                   //buscar el articulo asignar el nombre de la imagen         
            Article.findOneAndUpdate({_id:articleId}, {image: file_name}, {new:true}, (err, articleUpdated)=>{
                if(err || !articleUpdated){
                    return res.status(200).send({
                        status: 'error',
                        message: 'error al guardar la imagen de articulos'
                    });
                }
                return res.status(200).send({
                    status: 'success',
                    article: articleUpdated
                    //fichero: req.files,
                    //split: file_split,
                    //file_ext
                });
            }); 
            }else{
                return res.status(200).send({
                status: 'success',
                image:file_name
                });
            }
                
        }        
    }, //end upload file      
    
    getImage: (req, res) =>{
        var file = req.params.image;
        var path_file = 'upload/articles/'+file;
        
            if (fs.existsSync(path_file)) {
                return res.sendFile(path.resolve(path_file));
            }else{
                return res.status(404).send({
                    status: 'error', 
                    message: 'La imagen no existe'              
                });
            }           
    },
    search: (req, res) =>{
        //sacar el string a buscar
        var searchString = req.params.search;

        //find or 
        Article.find({ "$or":[
            {"title":{"$regex":searchString,"$options":"i"}},
            {"content":{"$regex": searchString,"$options": "i"}}
        ]})
        .sort([['date','descending']])
        .exec((err, articles)=>{

            if(err){
                return res.status(500).send({
                    status: 'error', 
                    message: 'error en la peticion'              
                });
            }
            if(!articles || articles.length <= 0){
                return res.status(404).send({
                    status: 'error', 
                    message: 'no hay coincidencias para tu busqueda'              
                });
            }

            return res.status(200).send({
                status: 'success', 
               articles         
            });

        });

       
    }

};// end controllers

module.exports = controller;