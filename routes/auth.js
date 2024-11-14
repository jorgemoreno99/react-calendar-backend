const { Router } = require('express')
const { check } = require('express-validator')
const router = Router()
const { crearUsuario, loginUsario ,renewToken } = require('../controllers/auth')
const { validarCampos } = require('../middlewares/fields-validators')
const { validateJWT } = require('../middlewares/validate-jws')

// /api/auth

router.post(
    '/new',
    [ //middlewares
        check('name', "El nombre es obligatorio").not().isEmpty(),
        check('email', "El email es obligatorio").isEmail(),
        check('password', "El password debe ser de 6 caracteres").isLength({min: 6}),
        validarCampos
    ],
    crearUsuario
)


router.post(
    '/',
    [//middlewares
        check('email', "El email es obligatorio").isEmail(),
        check('password', "El password debe ser de 6 caracteres").isLength({min: 6}),
        validarCampos
    ],
    loginUsario
)

router.get('/renew', validateJWT, renewToken)


module.exports = router