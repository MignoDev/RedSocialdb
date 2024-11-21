var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var amigoModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
amigoModelo.getAmigos = function (callback) {
    if (connection) {
        var sql = "SELECT id_amigo, "
            + "id_perfil, "
            + "id_perfil_amigo, "
            + "estado_solicitud AS Solicitud_Amistad FROM tt_amigos";

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
amigoModelo.getAmigo = function (id, callback) {

    if (connection) {
        var sql = "SELECT p.id_perfil, p.nickname_perfil FROM tt_perfil AS p WHERE p.id_perfil != " + connection.escape(id) + " AND p.id_perfil NOT IN(SELECT a.id_perfil_amigo FROM tt_amigos AS a WHERE a.id_perfil = " + connection.escape(id) + " UNION SELECT a.id_perfil FROM tt_amigos AS a WHERE a.id_perfil_amigo = " + connection.escape(id) + ");";

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
amigoModelo.insertAmigo = function (usuariosData, callback) {
    if (connection) {
        //console.log(TipDocData)
        var sql = "INSERT INTO tt_amigos SET ?";

        connection.query(sql, usuariosData, function (error, result) {
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

amigoModelo.getAmigosByPerfil = function (id_perfil, callback) {
    if (connection) {
        var sql = `
                    SELECT a.id_amigo, a.id_perfil_amigo, p.nickname_perfil, pt.nickname_perfil AS Nick_Amigo
                    FROM tt_amigos AS a
                    INNER JOIN tt_perfil AS p ON a.id_perfil_amigo = p.id_perfil
                    INNER JOIN tt_perfil AS pt ON a.id_perfil = pt.id_perfil
                    WHERE (a.id_perfil = ? or a.id_perfil_amigo = ?) and a.estado_solicitud = "Aceptado"
        `;

        connection.query(sql, [id_perfil, id_perfil], function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, JSON.stringify(rows));
            }
        });
    }
};

amigoModelo.deleteAmigo = function (id_perfil, id_perfil_amigo, callback) {
    if (connection) {
        var sql = "DELETE FROM tt_amigos WHERE (id_perfil = " + connection.escape(id_perfil) + " and id_perfil_amigo = " + connection.escape(id_perfil_amigo) + ") or ( id_perfil = " + connection.escape(id_perfil_amigo) + " and id_perfil_amigo " + connection.escape(id_perfil) + ");";

        connection.query(sql, function (error, rows) {
            if (error) {
                throw error;
            } else {
                callback(null, JSON.stringify(rows));
            }
        });
    }
};
/*
//---------------------------------------------------------------
//actualizar un tipo de documento
amigoModelo.updateUsuarioNombre = function (usuarioNombre, callback)
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

amigoModelo.updateUsuarioApellido = function (usuarioData, callback)
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

amigoModelo.updateUsuarioContrasena = function (usuarioData, callback)
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
module.exports = amigoModelo;