const mongoose = require('mongoose');
const joi = require('joi');

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
})


UserSchema.methods.joiValidate = (obj) => {
    const schema = {
        username: joi.types.String().min(6).max(30).required(),
        email: joi.types.email().required(),
        password: joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
        first_name: joi.types.String().min(4).max(20).required(),
        last_name: joi.types.String().min(3).max(20).required()
    }
    return joi.validate(schema, obj)
}

module.exports = mongoose.model('User', UserSchema);