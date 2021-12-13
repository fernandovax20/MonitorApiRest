const Role = require('../models/role')
const Usuario = require('../models/usuario')




const esRoleValido = async(rol = '') => {

    const existeRol = await Role.findOne({ rol });
    if(!existeRol){
        throw new Error(`El rol ${rol} no esta registrado en la base de datos`);
    }
}

//verificar si el correo existe
const existeEmail = async(correo = '') =>{
    const existe =  await Usuario.findOne({ correo });
    if(existe){
        throw new Error(`El correo ${correo} ya esta registrado en la base de datos`);
    }
}

//verificar si usuario existe
const existeUsuarioPorId = async(id = '') =>{
    const existe =  await Usuario.findById(id);
    if(!existe){
        throw new Error(`El usuario con el ${id} no esta registrado en la base de datos`);
    }
}



module.exports = {
    esRoleValido,
    existeEmail,
    existeUsuarioPorId
}