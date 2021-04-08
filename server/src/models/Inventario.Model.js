// Mongoose
const { Schema, model } = require('mongoose')
// Creando tabla y datos de tabla
const ProductosSchema = new Schema({
    imagen: {
        type: String,
    },
    cantidad: {
        type: Number
    },
    nombre: {
        type: String,
        require: true
    },
    Proveedor: {
        type: String
    },
    precio: {
        type: Number
    }

})
// enviando informacion a Mongodb

const Inventario = model('Inventario', ProductosSchema);
// Exportando modulo
module.exports = Inventario;