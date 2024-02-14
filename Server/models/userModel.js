import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    confirmPassword: { type: String, required: true, select: false}
}, {timestamps: true});

// hash function
userSchema.methods.hashPassword = async function(next){
    if(!this.isModified('password')){
        return next();
    }else{
        this.password = bcrypt.hash(this.password, 8);
        this.confirmPassword = undefined;
        next();
    }
}

// punch jwt token
userSchema.methods.getSignedToken = function(){
    return jwt.sign({id: this._id}, process.env.JWT_SECRET, {
        expiresIn: 24*60*60*1000
    });
}

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

userSchema.pre('save', async function(next){
    this.hashPassword(next);
});

const User = mongoose.model('User', userSchema);

export default User;