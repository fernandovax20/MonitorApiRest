const { Router } = require('express');
const { check } = require('express-validator');

const{
    validarCampos, 
    validarJWT,
    esAdmin
} =  require ('../middlewares')

const { 
    esRoleValido, 
    existeEmail, 
    existeUsuarioPorId 
} = require('../helpers/db-validators');

const { 
    usuariosGet,
    usuariosGetAll, 
    usuarioGetLocalization,
    usuariosPut,
    usuariosPost,
    usuariosDelete,
    usuariosPatch,
    usuariosCoordinatesPost
} = require('../controllers/usuarios');




const router = Router();

router.get('/', usuariosGet );
router.get('/all', usuariosGetAll );


router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check ('rol').toUpperCase().custom( esRoleValido ),
    validarCampos
], usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener mas de 6 caracteres').isLength({min: 6}),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( existeEmail ),
    check ('rol').toUpperCase().custom( esRoleValido ),
    validarCampos
], usuariosPost );

router.post('/coordenadas', [
    check('id', 'No es un ID valido').isMongoId(),
    check('latitud', 'La latitud es obligatoria').not().isEmpty(),
    check('longitud', 'La longitud es obligatoria').not().isEmpty(),
    validarCampos
], usuariosCoordinatesPost );

router.get('/localizacion/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuarioGetLocalization );

router.delete('/:id',[
    validarJWT,
    esAdmin,
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );


router.patch('/:id', usuariosPatch );





module.exports = router;