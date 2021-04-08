const mongoose = require('mongoose');
const { DB } = require('../config');

//Coneccion a Base de datos
module.exports = {
    connection: null,
    connect: function () {
        if (this.connection) return this.connection;
        return mongoose.connect(DB, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            useFindAndModify: false,
            autoIndex: false,
            poolSize: 10,
            bufferMaxEntries: 0
        }).then(connection => {
            this.connection = connection;
            console.log('Conexion a Base de Datos Exitosa');
        }).catch(error => console.log(error));
    }
}