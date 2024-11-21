var connection = require('../Conexion')
//creamos un objeto para ir almacenandotodo lo que necesitemos
var reaccionModelo = {};

//---------------------------------------------------------------
//obtenemos todos los tipos de documento
reaccionModelo.getReacciones = function (callback)
{
    if (connection)
    {
        var sql = "SELECT id_reaccion, "					
                            +"id_publicacion, " 
                            +"id_perfil, " 
                            +"reaccion_reaccion AS Reaccion FROM tt_reacciones";
        //console.log("aqui")
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
}

//---------------------------------------------------------------
reaccionModelo.getReaccion = function (id, callback)
{
    
    if (connection)
    {
        var sql = "SELECT id_reaccion, "					
                            +"id_publicacion, " 
                            +"id_perfil, " 
                            +"reaccion_reaccion AS Reaccion "
                            +"FROM tt_reacciones WHERE id_publicacion ="
                            + connection.escape(id) + ";";
               
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


}

//---------------------------------------------------------------
//añadir una nueva persona
reaccionModelo.insertReaccion = function (reaccionData, callback)
{
    if (connection)
    {
        //console.log(TipDocData)
        var sql = "INSERT INTO tt_reacciones SET ?";

        connection.query(sql, reaccionData, function (error, result)
        {
            //se muestra el mensaje correspondiente
            if (error)
            {
                throw error;
            }
            else
            {
                callback(null,{"msg": "Registro Insertado"});
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
module.exports = reaccionModelo;