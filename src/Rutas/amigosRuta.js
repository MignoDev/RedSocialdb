const express = require('express');
const router = express.Router();

const amigoModelo = require('../Modelos/amigosModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        amigoModelo.getAmigos(function (error, data) {
            res.status(200).json(data);
        });
    });

    //---------------------------------------------------------------
    //---------------------------------------------------------------
    router.get("/:id", function (req, res) {
        var id = req.params.id;

        //solo actualizamos si la id es un número
        if (!isNaN(id)) {
            amigoModelo.getAmigo(id, function (error, data) {
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

    router.get('/amigos/:id_perfil', function (req, res) {
        const id_perfil = req.params.id_perfil;

        amigoModelo.getAmigosByPerfil(id_perfil, function (error, result) {
            if (error) {
                res.status(500).json({ "msg": "Error en el servidor" });
            } else if (result && result.length > 0) {
                res.status(200).json(result);
            } else {
                res.status(404).json({ "msg": "Registro no Existe" });
            }
        });
    });

    //---------------------------------------------------------------
    //Muestra y captura los datos del método CRUL crear, usando el verbo post
    router.post("/", function (req, res) {
        //creamos un objeto Json con los datos del usuario
        var amigosData =
        {
            id_amigo: null,
            id_perfil: req.body.id_perfil,
            id_perfil_amigo: req.body.id_perfil_amigo,
            estado_solicitud: req.body.estado_solicitud,
        };

        //usamos la funcion para insertar
        amigoModelo.insertAmigo(amigosData, function (error, data) {
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

        var amigosData =
        {
            id_amigo: req.body.id_amigo,
            id_perfil: req.body.id_perfil,
            id_perfil_amigo: req.body.id_perfil_amigo,
            estado_solicitud: req.body.estado_solicitud,
        };

        //usamos la funcion para actualizar
        amigoModelo.updateUsuarioNombre(amigosData, function (error, data) {
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

    router.delete("/:id_perfil/:id_perfil_amigo", function (req, res) {
        var id_perfil = req.params.id_perfil;
        var id_perfil_amigo = req.params.id_perfil_amigo;

        //solo actualizamos si la id es un número
        if (!isNaN(id_perfil) && !isNaN(id_perfil_amigo)) {
            amigoModelo.deleteAmigo(id_perfil, id_perfil_amigo, function (error, data) {
                if (data && data.msg === "Eliminado" || data.msg == "No existe") {
                    res.status(200).json(data);
                }
                else {
                    res.status(500).json({ "msg": "Error" });
                }
            });
        }
        else {
            res.status(500).json({ "msg": "No es un número" });
        }
    });

    return router;
}