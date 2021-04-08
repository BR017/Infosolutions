// express
const express = require('express');
const Route = express.Router();
// contolador de account
const { loginontroller } = require('../controllers/Login.Controller')
// rutas de account
Route.post('/login', loginontroller)

module.exports = Route;