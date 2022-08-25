const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const {isEmail} = require('validator');

const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required : [true , 'Entering email is mandatory'],
        unique : [true , 'Email exist , try another'],
        lowercase : true,
        validate : [isEmail, 'Email not valide']
    },
    password : {
        type : String,
        required : [true , 'Password is mandatory'],
        minlength : [6 , 'Password should be more than 6 letter& numbers']
    }
});

userSchema.post('save' , function(doc , next){
console.log('this is current user all informaarions' , doc);
next();
});

userSchema.pre('save' ,async function(next) {
    try{
    const salt = await bcrypt.genSalt();
const hashedpass = await bcrypt.hash(this.password , salt);
this.password = hashedpass;
next();
}
catch(err) {
    console.log(err);
}
});
const user = mongoose.model('user',userSchema);

module.exports = user;