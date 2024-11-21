var express = require('express');
var router = express.Router();

var reaccionModelo = require('../Modelos/reaccionesModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        reaccionModelo.getReacciones(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            reaccionModelo.getReaccion(id, function (error, data) {
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
        var reaccionData =
        {
            id_reaccion: null,
            id_publicacion: req.body.id_publicacion,
            id_perfil: req.body.id_perfil,
            reaccion_reaccion: req.body.reaccion_reaccion,

        };

        //usamos la funcion para insertar
        reaccionModelo.insertReaccion(reaccionData, function (error, data) {
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
        reaccionModelo.updateUsuarioNombre(publicacionData, function (error, data) {
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

    return router;
}  