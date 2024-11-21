var express = require('express');
var router = express.Router();

var publicacionModelo = require('../Modelos/publicacionesModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        publicacionModelo.getPublicaciones(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            publicacionModelo.getPublicacion(id, function (error, data) {
                //si el tipo de documento existe lo mostramos en formato json
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                }
                //en otro caso mostramos una respuesta conforme no existe
                else {
                    res.json(404,
                        {
                            "msg": "Registro no Existe"
                        });
                }
            });
        }
        else //si hay algún error
        {
            res.status(500).json({ "msg": "No es un número" });
        }
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos del usuario
        var publicacionData =
        {
            id_publicacion: null,
            id_perfil: req.body.id_perfil,
            texto_publicacion: req.body.texto_publicacion,
            foto_publicacion: req.body.foto_publicacion,

        };

        //usamos la funcion para insertar
        publicacionModelo.insertPublicacion(publicacionData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send({ error: "boo:(" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos para el método CRUL update (actualizar), usando el verbo put
    router.put("/", function (req, res) {
        //almacenamos los datos de la petición en un objeto

        var publicacionData =
        {
            id_publicacion: req.body.id_publicacion,
            id_perfil: req.body.id_perfil,
            texto_publicacion: req.body.texto_publicacion,
            foto_publicacion: req.body.foto_publicacion,
        };

        //usamos la funcion para actualizar
        publicacionModelo.updateUsuarioNombre(publicacionData, function (error, data) {
            //se muestra el mensaje correspondiente
            if (data && data.msg) {
                res.status(200).json(data);
            }
            else {
                res.status(500).send(
                    {
                        error: "boo:("
                    });
            }
        });
    });

    // Obtener publicaciones por id_perfil
    router.get('/perfil/:id_perfil', function (req, res) {
        var id_perfil = req.params.id_perfil;

        // Verificamos que el id_perfil sea un número
        if (!isNaN(id_perfil)) {
            publicacionModelo.getPublicacionesByPerfilConNombre(id_perfil, function (error, data) {
                if (error) {
                    res.status(500).json({ "msg": "Error al obtener las publicaciones" });
                } else if (data.length > 0) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({ "msg": "No hay publicaciones para este perfil" });
                }
            });
        } else {
            res.status(500).json({ "msg": "El id_perfil no es un número" });
        }
    });

    // Obtener publicaciones de amigos por id_usuario
    router.get('/amigos/:id_usuario', function (req, res) {
        var id_usuario = req.params.id_usuario;

        // Verificamos que el id_usuario sea un número
        if (!isNaN(id_usuario)) {
            publicacionModelo.getPublicacionesDeAmigos(id_usuario, function (error, data) {
                if (error) {
                    res.status(500).json({ "msg": "Error al obtener las publicaciones de amigos" });
                } else if (data.length > 0) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({ "msg": "No hay publicaciones de amigos para este usuario" });
                }
            });
        } else {
            res.status(500).json({ "msg": "El id_usuario no es un número" });
        }
    });

    return router;
}  