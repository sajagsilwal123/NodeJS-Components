const mongoose = require('mongoose');
const joi = require('joi');
const bcrypt = require('bcrypt');
const schema = mongoose.Schema;

const UserSchema = new schema({
    username: {type: String, unique: true},
    password: String, 
    email: {type: String, unique: true},
    firstname: String, 
    lastname: String,
    emailToken: String,
    //role: {type:String,enum:['User','Admin'],default:'User'}     
},
{
    timestamps: true
});

// auth.JoiValidate(UserSchema);
// // UserSchema.methods.joiValidate = (obj) => {
//     const schema = {
//         username: joi.types.String().min(6).max(30).required().messages({'string.min':'mininmum j'}),
//         email: joi.types.email().required(),
//         password: joi.types.String().min(8).max(30).regex(/[a-zA-Z0-9]{3,30}/).required(),
//         first_name: joi.types.String().min(4).max(20).required(),
//         last_name: joi.types.String().min(3).max(20).required()
//     }
//     return joi.validate(schema, obj)
// };

UserSchema.post('save', (docs, next) => {
    console.log(`New User was created and Saved!!`, docs);
    next();
})

UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    console.log(`PASSWORD ENCRYPTED SUCCESSFULLY!!`)
    next()
})

UserSchema.methods.comparePassword = function(candidatePassword, cb){
    bcrypt.compare(candidatePassword, this.password, (err, result)=>{
        if(err)
            return cb(err, result);
        else
            return cb(err, result)
    })
}

module.exports = mongoose.model('User', UserSchema);