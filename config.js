const mongoose = require('mongoose');

const DB  = 'mongodb://localhost:27017/Components';
const TOKEN_KEY = '12345-67890-09876-54321';
 
exports.connectDB = () => {
    mongoose.
    connect(DB)
    .then(() => {
        console.log(`successfully connected to the db: ${DB}`);        
    })
    .catch((err) => {
        console.log(`Database connection failed!!`);
        console.error(err);
        process.exit(1);
    })
}
