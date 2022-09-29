const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');

const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {type: String, unique: true},
    password: String, 
    email: String,
    firstname: String, 
    lastname: String     
},
{
    timestamps: true
});

UserSchema.methods.joiValidate = (obj) => {
    const schema = {
        username: joi.types.String().min(6).max(30).required(),
        email: joi.types.email().required(),
        password: joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
        first_name: joi.types.String().min(4).max(20).required(),
        last_name: joi.types.String().min(3).max(20).required()
    }
    return joi.validate(schema, obj)
};

UserSchema.post('save', (docs, next) => {
    console.log(`New User was created and Saved!!`, docs);
    next();
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    // .then((docs)=>{
    //     console.log(docs);
    // })
    // .catch((err) => {console.error(err)})
    next()
})

module.exports = mongoose.model('User', UserSchema);