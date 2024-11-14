const express = require("express");
const Event = require('../models/Event')



const getEventos = async (req, res = express.response) => {
    try {
        const events = await Event.find().populate('user', 'name') //.populate permite incluir en la consulta la entidad completa del usuario relacionado a cada evento
        
        console.log("events!", events);
        res.json({ ok: "true", events });
    } catch (error) {
      console.log("🚀 error:", error);
      return res.status(500).json({
        ok:false,
        msg: "Error al guardar en db"
      })
    }
};

const crearEvento = async (req, res = express.response) => {
  
    const { title, start, end, notes } = req.body;

    try {
        const event = new Event(req.body);
        event.user = req.id
        await event.save();
        console.log("Creado!", event);
        res.json({ ok: "guardado",event });
    } catch (error) {
      console.log("🚀 error:", error);
      return res.status(500).json({
        ok:false,
        msg: "Error al guardar en db"
      })
    }
};


const actualizarEvento = async (req, res = express.response) => {
    const uid = req.id;
    const eventId = req.params.id

    try {
        let event = await Event.findById(eventId)

        //validaciones
        if(!event) return res.status(404).json({ok:false, msg: "evento no encontrado"})
        if(event.user.toString() !== uid) return res.status(401).json({ok:false, msg: "No tiene permiso para editar"})


        const newEvent = {
            ...req.body,
            user: uid,
        }

        // const updated = await Event.findByIdAndUpdate(eventId, newEvent); //ESTO VA A ACTUALIZAR Y DEVOLVER EL ANTIGUO OBJETO
        const updated = await Event.findByIdAndUpdate(eventId, newEvent, {new:true}); //ESTO VA A ACTUALIZAR Y DEVOLVER EL NUEVO OBJETO

        res.json({ ok: "actualizado",  updated });
    } catch (error) {
      console.log("🚀 error:", error);
      return res.status(500).json({
        ok:false,
        msg: "Error al actualizar en db"
      })
    }
};


const eliminarEvento = async (req, res = express.response) => {
    const uid = req.id;
    const eventId = req.params.id

    try {
        let event = await Event.findById(eventId)

        //validaciones
        if(!event) return res.status(404).json({ok:false, msg: "evento no encontrado"})
        if(event.user.toString() !== uid) return res.status(401).json({ok:false, msg: "No tiene permiso para eliminar"})


        const deleted = await Event.findByIdAndDelete(eventId);

        res.json({ ok: "eliminado",  deleted });
    } catch (error) {
      console.log("🚀 error:", error);
      return res.status(500).json({
        ok:false,
        msg: "Error al actualizar en db"
      })
    }
};



module.exports = {
  getEventos,
  crearEvento,
  actualizarEvento,
  eliminarEvento,
};
