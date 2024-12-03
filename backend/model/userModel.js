const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        require:true,
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true,
    },
    role:{
        type:String,
        enum: ['guest', 'user', 'admin'],
        default:'guest'
    }
})


//hashage du mot de passe

userSchema.pre('save', async function (next){
    if(!this.isModified('password')){
        next()
    }

    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt);
})

//verification du mot de passe avant la connexion

userSchema.methods.matchPassword = async function (enterPassword) {
    return await bcrypt.compare(enterPassword, this.password);
}

const User = mongoose.model('users', userSchema)

export default User;