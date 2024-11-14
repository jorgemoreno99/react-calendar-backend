const mongoose = require("mongoose");



const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.DB_CNN,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
    });
    console.log("DB CONNECTED");
    
  } catch (error) {
    console.log(error);
    throw Error("Error al conectar con bd");
  }
};

module.exports = {
    dbConnection
}
