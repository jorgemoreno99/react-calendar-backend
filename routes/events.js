const { Router } = require("express");
const { check } = require("express-validator");
const router = Router();
const { validarCampos } = require('../middlewares/fields-validators')
const { validateJWT } = require("../middlewares/validate-jws");
const {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
} = require("../controllers/events");
const { isDate } = require("../helpers/isDate");

// /api/events


//Esto establece que todas las rutas debajo de esta linea tendrán el middleware
router.use(validateJWT);

router.get("/", getEventos);


router.post("/",[
    check('title', "El title es obligatorio").not().isEmpty(),
    check('start', "El start debe ser una fecha valida").custom(isDate),
    check('end', "El end debe ser una fecha valida").custom(isDate),
    validarCampos
], crearEvento);

router.put("/:id", actualizarEvento);

router.delete("/:id", eliminarEvento);

module.exports = router;
