var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var publicacionModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
publicacionModelo.getPublicaciones = function (callback) {
    if (connection) {
        var sql = "SELECT id_publicacion, "
            + "id_perfil, "
            + "texto_publicacion AS Contenido, "
            + "foto_publicacion AS Foto FROM tt_publicaciones";
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
publicacionModelo.getPublicacion = function (id, callback) {

    if (connection) {
        var sql = "SELECT id_publicacion, "
            + "id_perfil, "
            + "texto_publicacion AS Contenido, "
            + "foto_publicacion AS Foto "
            + "FROM tt_publicaciones WHERE id_publicacion ="
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
publicacionModelo.insertPublicacion = function (publicacionData, callback) {
    if (connection) {
        var sql = "INSERT INTO tt_publicaciones SET ?";

        connection.query(sql, publicacionData, function (error, result) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, { msg: "Registro Insertado" });
            }
        });
    } else {
        callback(new Error("No database connection"), null);
    }
};

// En publicacionModelo.js
publicacionModelo.getPublicacionesByPerfil = function (id_perfil, callback) {
    if (connection) {
        var sql = 'SELECT * FROM tt_publicaciones WHERE id_perfil = ?';
        connection.query(sql, [id_perfil], function (error, result) {
            if (error) {
                callback(error, null);
            } else {
                callback(null, JSON.stringify(result));
            }
        });
    }
};

publicacionModelo.getPublicacionesDeAmigos = function (id_perfil, callback) {
    if (connection) {
        var sql = `
            SELECT p.id_publicacion, u.nickname_perfil, p.texto_publicacion, p.foto_publicacion
            FROM tt_publicaciones AS p
            INNER JOIN tt_amigos AS a ON p.id_perfil = a.id_perfil_amigo OR p.id_perfil = a.id_perfil
            INNER JOIN tt_perfil AS u ON p.id_perfil = u.id_perfil
            WHERE a.id_perfil = ?
        `;
        connection.query(sql, [id_perfil], function (error, result) {
            if (error) {
                callback(error, null);
            } else {
                result.forEach(row => {
                    if (row.foto_publicacion) {
                        row.foto_publicacion = row.foto_publicacion.toString('base64');
                    }
                });
                callback(null, JSON.stringify(result));
            }
        });
    }
};

publicacionModelo.getPublicacionesByPerfilConNombre = function (id_perfil, callback) {
    if (connection) {
        var sql = `
            SELECT p.id_publicacion, u.nickname_perfil, p.texto_publicacion, p.foto_publicacion
            FROM tt_publicaciones AS p
            INNER JOIN tt_perfil AS u ON p.id_perfil = u.id_perfil
            WHERE p.id_perfil = ?

        `;
        connection.query(sql, [id_perfil], function (error, result) {
            if (error) {
                callback(error, null);
            } else {
                result.forEach(row => {
                    if (row.foto_publicacion) {
                        row.foto_publicacion = row.foto_publicacion.toString('base64');
                    }
                });
                callback(null, JSON.stringify(result));
            }
        });
    }
};

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
module.exports = publicacionModelo;