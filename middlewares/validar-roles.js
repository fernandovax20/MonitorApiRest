const { response } = require("express");

const esAdmin = (req, res = response, next) =>{

    if(!req.usuario){
        return res.status(500).json({
            msg: "Se quiere verificar el roles sin validar el token primero"
        })
    }

    const {rol, nombre} = req.usuario
    
    if(rol!== "ADMIN"){
        return res.status(401).json({
            msg: `${nombre} no es admin - no tiene estos permisos`
        })
    }

    next();
}


module.exports ={
    esAdmin
}