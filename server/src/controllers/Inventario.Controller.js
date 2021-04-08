//Base de Datos Collection Productos
const Producto = require('../models/Inventario.Model');

//Busca todos los productos
function index(req,res){
    Producto.find({})
        .then(producto => {
            if(producto.length) return res.status(200).send({producto});
            return res.status(500).send({message: 'NO CONTENT'});
        }).catch(error => res.status(500).send({error}));
}

//Muestra uno en especifico
function show(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.producto) return res.status(404).send({message: 'NOT FOUND'});
    let producto = req.body.producto;
    return res.status(200).send({producto});
    
}

//Crea un producto
function create(req,res){
    mensaje = "usuario creado correctamente"
    new Producto(req.body).save().then(producto => res.status(201).send({mensaje,producto})).catch(error => res.status(500).send({error}));
}

//Actualiza un producto
function update(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.producto) return res.status(404).send({message: 'NOT FOUND'});
    let producto = req.body.producto[0];
    producto = Object.assign(producto,req.body);
    producto.save().then(producto => res.status(200).send({message: "UPDATED", producto})).catch(error => res.status(500).send({error}));
}

//Elimina un producto
function remove(req,res){
    if(req.body.error) return res.status(500).send({error});
    if(!req.body.producto) return res.status(404).send({message: 'NOT FOUND'});
    req.body.producto[0].remove().then(producto => res.status(200).send({message: 'REMOVED', producto})).catch(error => res.status(500).send({error}));
}

// Busca un producto en especifico
function find(req,res,next){
    let query = {};
    query[req.params.key] = req.params.value;
    Producto.find(query).then(producto => {
        if(!producto.length) return next();
        req.body.producto = producto;
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