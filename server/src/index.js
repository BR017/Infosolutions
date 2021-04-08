const express = require('express');
const { PORT } = require('./config/index')
const path = require('path')
const cors = require('cors')
const morgan = require('morgan')
const bodyParser = require('body-parser');

const app = express();

app.use(morgan('dev'))
app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());


const database = require('./database')
database.connect();

var LoginRoute = require('./routes/Login');
var AnalistasRoute = require('./routes/Analistas');
var InventarioRoute = require('./routes/Inventario');

app.use('/api', LoginRoute);
app.use('/api/analistas', AnalistasRoute);
app.use('/api/Inventario', InventarioRoute);

app.use(express.static(path.join(__dirname, './build')));
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, './build/index.html'));
});

app.listen(PORT, (err) => {
    err ? console.log(err) : console.log('servidor corriendo en el puerto ' + PORT)
})