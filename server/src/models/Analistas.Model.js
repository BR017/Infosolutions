// Mongoose
const { Schema, model } = require('mongoose')

const bcrypt = require('bcrypt');
// Creando tabla y datos de tabla
const AnalistaSchema = new Schema({
    Nombre: {
        type: String,
    },
    Correo: {
        type: String,
    },
    Contraseña: {
        type: String,
    },
    Identificacion: {
        type: String,
    },
    Telefono: {
        type: String,
    },
    Permisos: {
        type: String,
        default:false
    },
    imgPerfil: {
        type: String,
        default: 'https://res.cloudinary.com/dblz919ee/image/upload/v1617078071/avatar_vpjchu.png'
    }

})
// enviando informacion a Mongodb

// Encriptado contraseña
AnalistaSchema.pre('save', function (next) {
    bcrypt.genSalt(10).then(salts => {
        bcrypt.hash(this.Contraseña, salts).then(hash => {
            this.Contraseña = hash;
            next();
        }).catch(error => next(error));
    }).catch(error => next(error));
});

const Cliente = model('Analista', AnalistaSchema);
// Exportando modulo
module.exports = Cliente;