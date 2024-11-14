const { Schema, model } = require("mongoose");

const EventSchema = Schema({
  title: {
    type: String,
    required: true,
  },
  notes: {
    type: String,
  },
  start: {
    type: Date,
    required: true,
  },
  end: {
    type: Date,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
});


//Esto sirve para cambiar el nombre del campo _id a id y quitamos la __v (version)
EventSchema.method('toJSON', function(){
  const { __v, _id, ...object} = this.toObject()
  object.id = _id;
  console.log("🚀 ~ EventSchema.method ~ object:", object)
  return object;
})

module.exports = model("Event", EventSchema);
