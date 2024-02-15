import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false },
    avatar:{
        public_id:{
            type: String,
            default: "dummy_url"
        },
        secure_url:{
            type: String,
            default: "dummy_url"
        }
    }
}, {timestamps: true});

// hash function
userSchema.methods.hashPassword = async function(next){
    if(!this.isModified('password')){
        return next();
    }else{
        this.password = await bcrypt.hash(this.password, 8);
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

// method to compare password
userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

// Prehook
userSchema.pre('save', async function(next){
    await this.hashPassword(next);
});

const User = mongoose.model('User', userSchema);

export default User;