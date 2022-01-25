const jwt = require ('jsonwebtoken');

const generarJWT = ( uid ) => {

    return new Promise( (resolve, reject) => {
    
        const payload = {
            uid
        }
        
        jwt.sign({ uid }, process.env.JWT_SECRET, { 
            expiresIn: '12h' 
        }, (error, token) => {
            if(error){
                console.log(error)
                reject('Error al generar el token');
             }else{
               resolve (token);
            }
        });
        
    });

}


module.exports = { 
    generarJWT 
};