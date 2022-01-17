
// const Cat = mongoose.model('Cat', { name: String });

// const kitty = new Cat({ name: 'Zildjian' });
// kitty.save().then(() => console.log('meow'));

// mongodb+srv://fernandogr:arEmXU94PJpASX44@cluster0.c9kzh.mongodb.net/hospitaldb

const mongoose = require('mongoose');

const dbConnection = async () => {
    
    try {
        await mongoose.connect(process.env.DB_CNN,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // useCreateIndex: true
    
        });

        console.log('Base de datos ONLINE');

    }catch(error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }

}

module.exports = {
    dbConnection
}