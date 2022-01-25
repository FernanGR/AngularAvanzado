
const { Schema, model } = require('mongoose')


const UsuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']
    },
    password: {
        type: String,
        required: true,
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: true,
        default: 'USER_ROLE'
    },
    google: {
        type: Boolean,
        default: false,
    }
});


UsuarioSchema.method('toJSON', function() {
    const { __v, _id, password, ...object} = this.toObject();

    object.uid = _id;
    return object;
});



module.exports = model('Usuario', UsuarioSchema);