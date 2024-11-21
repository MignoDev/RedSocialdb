var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var comentarioModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
comentarioModelo.getComentarios = function (callback) {
    if (connection) {
        var sql = "SELECT id_comentario, "
            + "id_publicacion, "
            + "id_perfil, "
            + "emoji_comentario, "
            + "texto_comentario FROM tt_comentarios";
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
comentarioModelo.getComentario = function (id_publicacion, callback) {
    if (connection) {
        var sql = `
            SELECT c.id_comentario, c.id_publicacion, c.id_perfil, c.emoji_comentario, c.texto_comentario, p.nickname_perfil
            FROM tt_comentarios AS c
            INNER JOIN tt_perfil AS p ON p.id_perfil = c.id_perfil
            WHERE c.id_publicacion = ?
        `;

        connection.query(sql, [id_publicacion], function (error, rows) {
            if (error) {
                callback(error, null); // Pasar el error al callback
            } else {
                callback(null, rows); // Pasar los resultados directamente
            }
        });
    } else {
        callback(new Error("No database connection"), null); // Manejar el caso donde no hay conexión
    }
};

//---------------------------------------------------------------
//añadir una nueva persona
comentarioModelo.insertComentario = function (comentarioData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tt_comentarios SET ?";

        connection.query(sql, comentarioData, function (error, result) {
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
module.exports = comentarioModelo;