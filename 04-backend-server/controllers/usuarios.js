const { response } = require('express');
const bcrypt = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require('../helpers/jwt');

const getUsuarios = async (req, res) => {

    const desde = Number(req.query.desde) || 0;
    const hasta = Number(req.query.hasta) || 5;


    // const usuarios = await Usuario
    //                         .find({}, 'nombre email role img google')
    //                         .skip(desde)
    //                         .limit(hasta)
    //                         .exec();

    // const total = await Usuario.count();

    const [usuarios, total] = await Promise.all([
        Usuario
            .find({}, 'nombre email role img google')
            .skip(desde)
            .limit(hasta)
            .exec(),
        Usuario.countDocuments()
    ])
    



    res.json({
        ok: true,
        usuarios,
        uid: req.uid,
        total
    });
}


const crearUsuarios = async (req, res = response) => {

    const { email, password, nombre } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });

        if( existeEmail ){
            return res.status(400).json({
                ok: false,
                msg: 'El correo ya existe'
            });
        }


        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);



        // Guardar usuario
        await usuario.save();

        // generar token
        const token = await generarJWT(usuario.id);
        


        res.json({
            ok: true,
            usuario,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });
    }

}


const actualizarUsuarios = async (req, res = response) => {

    const uid = req.params.id;
    // const { nombre, email, role } = req.body;


    try{

        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }
   
        
        // Actualizaciones 
        
        const {password, google, email, ...campos} = req.body;

        if(usuarioDB.email !== email){
            const existeEmail = await Usuario.findOne({ email: email });
            if(existeEmail){
                return res.status(400).json({
                    ok: false,
                    msg: "Ya existe un usuario con ese email"
                })
            }
        }
 
        campos.email = email;
        const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, { new: true });

        res.json({
            ok: true,
            usuario: usuarioActualizado
        });

    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        });
    }

};


// delete

const borrarUsuario = async (req, res = response) => {

    const uid = req.params.id;
   
    try{
        
        const usuarioDB = await Usuario.findById(uid);

        if( !usuarioDB ){
            return res.status(404).json({
                ok: false,
                msg: 'No existe un usuario con ese id'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok: true,
            msg: 'Usuario borrado'
        });
    } catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error inesperado.. revisar logs'
        }); 


    }
}



module.exports = {
    getUsuarios,
    crearUsuarios,
    actualizarUsuarios,
    borrarUsuario
}