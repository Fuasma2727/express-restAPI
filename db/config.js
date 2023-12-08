const mongoose = require('mongoose');
require('dotenv').config();

const connectToDb = async()=>{
try {
    
    await mongoose.connect(process.env.DB_CONNECTION,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
   console.log('conectado a la base de datos') 
} catch (error) {
    console.log(error);
}

}

module.exports = connectToDb;

