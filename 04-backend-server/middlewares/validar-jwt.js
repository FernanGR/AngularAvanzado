const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {

    //Leer token
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token'
        });
    }

    try {

        const { uid } = jwt.verify(token, process.env.JWT_SECRET);
        req.uid = uid;
        
        next();

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al validar token'
        });
    }

}


module.exports = {
    validarJWT
}