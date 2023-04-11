import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim:true
    },
    email: {
        type: String,
        required: true,
        trim:true,
    },
    password: {
        type: String,
        required: true,
        trim:true
    },
    role: {
        type: String,
        enum: ['student','teacher','admin'],
        default: 'student'
    },
    enrolledCourses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course'
    }]
})

UserSchema.pre('save', function(next) {
    const user = this
    bcrypt.hash(user.password,10,(err,hash) => {
        user.password = hash
        if(this.role === 'admin') {
            this.role = 'student'
        }
        next()
    })
})

const User = mongoose.model('User',UserSchema)

export default User