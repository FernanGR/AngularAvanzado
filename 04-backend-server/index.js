//fernandogr
//arEmXU94PJpASX44
require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

//configurar cors
app.use( cors() );

// Base de datos
dbConnection();
console.log(process.env );


//rutas
app.get('/', (req, res) => {

    res.json({
        ok:true,
        msg:'Hola Mundo'
    });
});

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});