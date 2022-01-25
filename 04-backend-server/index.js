//fernandogr
//arEmXU94PJpASX44

// npm run start:dev   // iniciar server
// nodemon index.js    // iniciar server

require('dotenv').config();

const express = require('express');
const cors = require('cors')

const { dbConnection } = require('./database/config');

// crear el servidor de express
const app = express();

//configurar cors
app.use( cors() );

// Lectura y parseo del body
app.use ( express.json() );

// Base de datos
dbConnection();
console.log(process.env );


//rutas

 app.use('/api/usuarios', require('./routes/usuarios'));
 app.use('/api/login', require('./routes/auth'));

app.listen(process.env.PORT, () => {
    console.log('Servidor corriendo en el puerto ' + process.env.PORT);
});