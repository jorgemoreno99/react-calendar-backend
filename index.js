

const express = require('express')
const { dbConnection } = require('./db/config')
const cors = require('cors')
require('dotenv').config()


const app = express()

//bd
dbConnection();



//CORS
app.use(cors())

//Directorio publico
app.use( express.static('public') )


//Parseo de los bodys
app.use(express.json())


// RUTAS
app.use('/api/auth', require('./routes/auth'))
app.use('/api/events', require('./routes/events'))



app.listen(process.env.PORT, ()=>{
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
    
})