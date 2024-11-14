const express = require("express");
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");




const crearUsuario = async (req, res = express.response) => {
  const { email, password } = req.body;

  try {

    let existingUser = await User.findOne({email})
    if(existingUser){
      console.log("Email duplicado!");
      return res.status(400).json({
        ok:false,
        msg: "Email duplicado!"
      })
    }else{
      const user = new User(req.body);
      //Encriptar pass
      const salt = bcrypt.genSaltSync();
      user.password = bcrypt.hashSync(password.toString(), salt)

      await user.save();
      const token = await generateJWT(user.uid, user.name)
      console.log("Creado!", token);
      res.json({ ok: "mensaje", uid: user.id, name: user.name, token });
    }
  } catch (error) {
    console.log("🚀 error:", error);
    return res.status(400).json({
      ok:false,
      msg: "Error al guardar en db"
    })
  }
};

const loginUsario = async(req, res = express.response) => {
const { email, password } = req.body;

  try {

    let existingUser = await User.findOne({email})
    if(!existingUser){
      console.log("Usuario no existe");
      return res.status(400).json({
        ok:false,
        msg: "Email inexistente"
      })
    }else{
      //Confirmar pass
      const validPassword = bcrypt.compareSync(password, existingUser.password);
      if(!validPassword){
        console.log("Contraseña incorrecta");
        return res.status(400).json({
          ok:false,
          msg: "Contraseña incorrecta"
        })
      }    
      console.log("🚀 ~ existingUser:", existingUser)
      const token = await generateJWT(existingUser._id, existingUser.name)
      console.log("LOGIN!", token);
      res.json({ ok: true, msg: "login", token , id: existingUser._id, name: existingUser.name });
    }
  } catch (error) {
    console.log("🚀 error:", error);
    return res.status(400).json({
      ok:false,
      msg: "Error al guardar en db"
    })
  }
};


const renewToken = async(req, res = express.response) => {
  console.log("🚀 ~ app.get ~ req:", req.name);
  console.log("🚀 ~ app.get ~ req:", req.id);
  const token = await generateJWT("id", req.name)
  res.json({ ok: "mensaje", token , name : req.name, id : req.id});
};

module.exports = {
  crearUsuario,
  loginUsario,
  renewToken,
};
