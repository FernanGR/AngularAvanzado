const { response } = require('express');

const bcrypt = require('bcryptjs');
const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');
// const { googleVerify } = require('../helpers/google-verify');

const login = async (req, res) => {

    const { email, password } = req.body;

    try {

        //verificar email
        const usuarioDB = await Usuario.findOne({ email });

        if (!usuarioDB) {
            return res.status(404).json({
                ok: false,
                msg: "email no encontrado"
            });
        }

        // verificar contraseña
        const validPassword = bcrypt.compareSync(password, usuarioDB.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "contraseña incorrecta"
            });
        }

        // generar token
        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok: true,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });
    }
}

const googleSignIn = async (req, res = response) => {

    const googleToken = req.body.token;

    try {
    //    const {name, email, pincture } = await googleVerify(googleToken);

        const usuarioDB = await Usuario.findOne({ email });
        let usuario;

        if( !usuarioDB ){
            // si no existe el usuario se crea
            usuario = new Usuario({
                nombre: name,
                email,
                password: '@@@',
                img: pincture,
                google: true
            });
        }else{
            // si existe el usuario se actualiza
            usuario = usuarioDB;
            usuario.google = true;
            usuario.password = '@@@';
        }

        // guardar usuario
        await usuario.save();

        
        // generar token
        const token = await generarJWT(usuarioDB.id);


        res.json({
            ok: true,
            token

        });
    } catch (error) {
        console.log(error);
        res.status(401).json({
            ok: false,
            msg: 'token no correcto'
        });
    }

}


module.exports = {
    login,
    googleSignIn
}