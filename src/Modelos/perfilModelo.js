var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var perfilModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
perfilModelo.getPerfiles = function (callback) {
    if (connection) {
        var sql = "SELECT id_perfil,"
            + "nickname_perfil,"
            + "nombre_perfil AS Nombre,"
            + "apellido_perfil AS Apellido,"
            + "descripcion_perfil AS Descripcion,"
            + "correo_perfil,"
            + "password_perfil,"
            + "fecha_nacimiento_perfil,"
            + "genero_perfil FROM tt_perfil";
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
perfilModelo.getPerfil = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_perfil,"
            + "nickname_perfil,"
            + "nombre_perfil AS Nombre,"
            + "apellido_perfil AS Apellido,"
            + "descripcion_perfil AS Descripcion,"
            + "correo_perfil,"
            + "password_perfil,"
            + "fecha_nacimiento_perfil,"
            + "genero_perfil FROM tt_perfil WHERE id_perfil ="
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

perfilModelo.getPerfilCorreo = function (correo, callback) {

    if (connection) {
        var sql = "SELECT id_perfil,"
            + "nickname_perfil,"
            + "nombre_perfil,"
            + "apellido_perfil,"
            + "descripcion_perfil,"
            + "correo_perfil,"
            + "password_perfil,"
            + "fecha_nacimiento_perfil,"
            + "genero_perfil FROM tt_perfil WHERE correo_perfil ="
            + connection.escape(correo) + ";";

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
perfilModelo.insertPerfil = function (perfilData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tt_perfil SET ?";

        connection.query(sql, perfilData, function (error, result) {
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
module.exports = perfilModelo;