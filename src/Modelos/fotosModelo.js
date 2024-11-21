var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var fotoModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
fotoModelo.getFotos = function (callback) {
    if (connection) {
        var sql = "SELECT id_foto, "
            + "id_perfil, "
            + "nombre_foto, "
            + "ruta_foto, "
            + "foto FROM tt_fotos";
        //console.log("aqui")
        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                //callback(null, rows);
                callback(null, JSON.stringify(rows));
            }
        });
    }
}

//---------------------------------------------------------------
fotoModelo.getFoto = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_foto, "
            + "id_perfil, "
            + "nombre_foto, "
            + "ruta_foto, "
            + "foto FROM tt_fotos WHERE id_foto ="
            + connection.escape(id) + ";";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            }
            else {
                //callback(null, rows);
                callback(null, JSON.stringify(rows));
            }
        });
    }


}

//---------------------------------------------------------------
//añadir una nueva persona
fotoModelo.insertFoto = function (fotoData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tt_fotos SET ?";

        connection.query(sql, fotoData, function (error, result) {
            //se muestra el mensaje correspondiente
            if (error) {
                throw error;
            }
            else {
                callback(null, { "msg": "Registro Insertado" });
            }
        });
    }
}
/*
//---------------------------------------------------------------
//actualizar un tipo de documento
usuarioModelo.updateUsuarioNombre = function (usuarioNombre, callback)
 {    
    if (connection)
    {
        var sql = "UPDATE tt_usuario SET nombre1_usuario = " + connection.escape(usuarioNombre)
                    + " WHERE  id_usuario  =  " + connection.escape(usuarioData.id_usuario)+";";
               
        connection.query(sql, function (error, rows) 
        {
            if (error)
            {
                throw error;
            }
            else
            {
                //callback(null, rows);
                callback(null, JSON.stringify(rows));
            }
        });
    }

    if (connection)
    {
        var sql = "UPDATE tt_usuario SET nombre1_usuario = " + connection.escape(usuarioData.nombre1_usuario)
                    + " WHERE  id_usuario  =  " + connection.escape(usuarioData.id_usuario)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

usuarioModelo.updateUsuarioApellido = function (usuarioData, callback)
 {
    if (connection)
    {
        var sql = "UPDATE tt_usuario SET apellido1_usuario = " + connection.escape(usuarioData.apellido1_usuario)
                    + " WHERE  id_usuario  =  " + connection.escape(usuarioData.id_usuario)+";";

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}

usuarioModelo.updateUsuarioContrasena = function (usuarioData, callback)
 {
    if (connection)
    {
        var sql = "UPDATE tt_usuario SET password_usuario = " + connection.escape(usuarioData.password_usuario)
                    + " WHERE  id_usuario  =  " + connection.escape(usuarioData.id_usuario)+";";
        
        ///console.log(" 37  tal  " + sql);

        connection.query(sql, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null, {"msg": "Registro Actualizado"});
            }
        });
    }
}
*/
module.exports = fotoModelo;