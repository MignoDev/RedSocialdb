var express = require('express');
var router = express.Router();

var perfilModelo = require('../Modelos/perfilModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        perfilModelo.getPerfiles(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        perfilModelo.getPerfil(id, function (error, data) {
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
    });

    //leer perfil por correo
    router.get("/1/:correo", function (req, res) {
        var correo = req.params.correo;

        // obtener perfil por correo
        perfilModelo.getPerfilCorreo(correo, function (error, data) {

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
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos del usuario
        var perfilData =
        {
            id_perfil: null,
            nickname_perfil: req.body.nickname_perfil,
            nombre_perfil: req.body.nombre_perfil,
            apellido_perfil: req.body.apellido_perfil,
            descripcion_perfil: req.body.descripcion_perfil,
            correo_perfil: req.body.correo_perfil,
            password_perfil: req.body.password_perfil,
            fecha_nacimiento_perfil: req.body.fecha_nacimiento_perfil,
            genero_perfil: req.body.genero_perfil,

        };

        //usamos la funcion para insertar
        perfilModelo.insertPerfil(perfilData, function (error, data) {
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

        var usuariosData =
        {
            id_perfil: req.body.id_perfil,
            nickname_perfil: req.body.nickname_perfil,
            nombre_perfil: req.body.nombre_perfil,
            apellido_perfil: req.body.apellido_perfil,
            descripcion_perfil: req.body.descripcion_perfil,
            correo_perfil: req.body.correo_perfil,
            password_perfil: req.body.password_perfil,
            fecha_nacimiento_perfil: req.body.fecha_nacimiento_perfil,
            genero_perfil: req.body.genero_perfil,
        };

        //usamos la funcion para actualizar
        perfilModelo.updateUsuarioNombre(usuariosData, function (error, data) {
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