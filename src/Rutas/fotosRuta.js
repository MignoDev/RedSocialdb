var express = require('express');
var router = express.Router();

var fotoModelo = require('../Modelos/fotosModelo');

module.exports = function () {
    router.get("/", function (req, res) {
        fotoModelo.getFotos(function (error, data) {
            res.status(200).json(data);
        });
    });

    router.get("/:id", function (req, res) {
        var id = req.params.id;

        if (!isNaN(id)) {
            fotoModelo.getFoto(id, function (error, data) {
                if (typeof data !== 'undefined' && data.length > 0) {
                    res.status(200).json(data);
                } else {
                    res.status(404).json({ "msg": "Registro no Existe" });
                }
            });
        } else {
            res.status(500).json({ "msg": "No es un número" });
        }
    });

    // router.post("/", upload.single('foto'), function (req, res) {
    //     var fotoData = {
    //         id_foto: null,
    //         id_perfil: req.body.id_perfil,
    //         nombre_foto: req.body.nombre_foto,
    //         ruta_foto: null, // No need for a file path
    //         foto: req.file ? req.file.buffer : null, // Store the file buffer
    //     };

    //     fotoModelo.insertFoto(fotoData, function (error, data) {
    //         if (data) {
    //             res.status(200).json(data);
    //         } else {
    //             res.status(500).send({ error: "Error al insertar la foto" });
    //         }
    //     });
    // });

    // router.put("/", upload.single('foto'), function (req, res) {
    //     var publicacionData = {
    //         id_foto: req.body.id_foto,
    //         id_perfil: req.body.id_perfil,
    //         nombre_foto: req.body.nombre_foto,
    //         ruta_foto: null, // No need for a file path
    //         foto: req.file ? req.file.buffer : req.body.foto, // Store the file buffer
    //     };

    //     fotoModelo.updateUsuarioNombre(publicacionData, function (error, data) {
    //         if (data && data.msg) {
    //             res.status(200).json(data);
    //         } else {
    //             res.status(500).send({ error: "Error al actualizar la foto" });
    //         }
    //     });
    // });

    return router;
}