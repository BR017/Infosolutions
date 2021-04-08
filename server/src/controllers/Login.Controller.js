const Analistas = require('../models/Analistas.Model');
const bcrypt = require('bcrypt');

function loginontroller(req, res) {
    const { Correo, Contraseña } = req.body;
    Analistas.find({ Correo })
        // si todo salio salio bien
        .then((user) => {
            // Si no existen resultados
            if (!user[0]) return res.status(404).send({ message: 'EL USUARIO NO EXISTE'});
            // comparamos la contraseña
            bcrypt.compare(Contraseña, user[0].Contraseña)
                // si son comparables
                .then(async (match) => {
                    // si es correcta
                    if (match) {
                        res.status(200).send({ message: 'ACCESO',User:user[0] });
                    } else {
                        // no es correcta la password
                        res.status(404).send({ message: 'CONTRASEÑA INCORRECTA'});
                    }
                })
                // si no son coparables
                .catch(error => {
                    console.log(error);
                    res.status(500).send({ error });
                });
        })
        // Si todo salio mal
        .catch(error => {
            console.log(error);
            res.status(402).send({ error });
        });
}
module.exports = {
    loginontroller
}