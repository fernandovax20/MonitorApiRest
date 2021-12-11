const { response, request } = require('express');
const bcryptjs = require('bcryptjs');
const Usuario = require ('../models/usuario');




const usuariosGet = async(req = request, res = response) => {

    
    const query = {estado: true}

    //const usuarios = await Usuario.find(query)
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
           // .skip(Number(desde))
           // .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}

const usuariosGetAll = async(req = request, res = response)=> {

    //const usuarios = await Usuario.find(query)
    //.skip(Number(desde))
    //.limit(Number(limite));

    //const total = await Usuario.countDocuments(query);

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(),
        Usuario.find()
           // .skip(Number(desde))
           // .limit(Number(limite))
    ])

    res.json({
        total,
        usuarios
    });
}


const usuariosPost = async(req = request, res = response) => {

    const {nombre, correo, password, rol} = req.body;
    const usuario = new Usuario({nombre, correo, password, rol});

    //encriptar contraseña
    const salt = bcryptjs.genSaltSync(10);
    usuario.password = bcryptjs.hashSync( password, salt );

    // guardar en base de datos
    await usuario.save();

    res.json({
        usuario
    });
}

const usuariosPut = async (req= request, res = response) => {

    const { id } = req.params;
    const {_id, password, google,correo, ...resto} =  req.body;

    //to do validar contra base de datos
    if(password){
        //encriptar contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync( password, salt );   
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
}

const usuariosPatch = async(req= request, res = response) => {
    const {id} = req.params;
    const usuario = await Usuario.findById(id);

    res.json({
        usuario
    });
}

const usuariosDelete = async(req= request, res = response) => {

    const {id} = req.params;

    //borrar a un usuario con estado
    const usuario = await Usuario.findByIdAndUpdate(id, {estado: false});

    res.json({
        usuario
    });
}



module.exports = {
    usuariosGet,
    usuariosGetAll,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete,
}