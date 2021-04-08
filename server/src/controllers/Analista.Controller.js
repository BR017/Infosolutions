//Base de Datos Collection Productos
const Analistas = require('../models/Analistas.Model');

//Busca todos los productos
function index(req,res){
    Analistas.find({})
        .then(analistas => {
            if(analistas.length) return res.status(200).send({analistas});
            return res.status(500).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}
//Muestra uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.analistas) return res.status(404).send({message: 'NOT FOUND'});
    let analistas = req.body.analistas;
    return res.status(200).send({analistas});
    
}
//Crea un producto
function create(req,res){
    mensaje = "usuario creado correctamente"
    new Analistas(req.body).save().then(analistas => res.status(201).send({mensaje,analistas})).catch(error => res.status(500).send({error}));
}
//Actualiza un producto
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.analistas) return res.status(404).send({message: 'NOT FOUND'});
    let analistas = req.body.analistas[0];
    analistas = Object.assign(analistas,req.body);
    analistas.save().then(analistas => res.status(200).send({message: "UPDATED", analistas})).catch(error => res.status(500).send({error}));
}
//Elimina un producto
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.analistas) return res.status(404).send({message: 'NOT FOUND'});
    req.body.analistas[0].remove().then(analistas => res.status(200).send({message: 'REMOVED', analistas})).catch(error => res.status(500).send({error}));
}

// Busca un producto en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Analistas.find(query).then(analistas => {
        if(!analistas.length) return next();
        req.body.analistas = analistas;
        return next();
    }).catch(error =>{
        req.body.error = error;
        next();
    })
}

module.exports = {
    index,
    show,
    create,
    update,
    remove,
    find
}