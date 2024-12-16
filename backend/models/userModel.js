import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema({
    username: {
        type: String,

    }, 
    name: {
        type: String,
        unique: true,
    },
    email: {
        type: String,
        unique: true,
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user',
    },
    created_at: {
        type: Date,
        default: Date.now,
    },
    updated_at: {
        type: Date,
        default: Date.now,
    }
    
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
})

userSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password);
}


//Cette partie dit à MongoDB que la structure d’un utilisateur doit suivre cette règle.
const User = mongoose.model('Users', userSchema);

export default User;