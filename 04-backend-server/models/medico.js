
const { Schema, model } = require('mongoose');
 


const MedicoSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    img: {
        type: String,
        required: false
    },
    usuario: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Usuario'
    },
    hospital: {
        require: true,
        type: Schema.Types.ObjectId,
        ref: 'Hospital'
    }
});


MedicoSchema.method('toJSON', function() {
    const { __v, ...object} = this.toObject();
 
    return object;
});

module.exports = model('Medico', MedicoSchema);