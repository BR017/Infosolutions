// express
const express = require('express');
const Route = express.Router();
// contolador de account
// contolador de cliente
const { index, create, find, show, update, remove } = require('../controllers/Analista.Controller');
// rutas de account
Route.get('/', index)
    .post('/create', create)
    .get('/:key/:value', find, show)
    .put('/:key/:value', find, update)
    .delete('/:key/:value', find, remove);

module.exports = Route;