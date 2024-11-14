const jwt = require("jsonwebtoken");
const { response } = require("express");

const validateJWT = (req, res = response, next) => {
  //HEADERS -> x-token
  const token = req.header("x-token");

  if (!token) return res.status(401).json({ ok: false, msg: "unauthorized" });
  try {
    const payload = jwt.verify(token, process.env.SECRET_JWT_TOKEN_SEED);
    req.id = payload.id
    req.name = payload.name
    console.log("jwt valid")
    next();
  } catch (error) {
    console.log("unauthorized")
    return res.status(401).json({ ok: false, msg: "unauthorized" });
  }
};

module.exports = {
  validateJWT,
};
