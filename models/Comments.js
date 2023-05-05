import mongoose from "mongoose"

const Schema = mongoose.Schema

const CommentsSchema = new Schema({
    comment:{
        type: String,
        required: true,
        trim:true
    },    
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    course:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Course',
    },
    parentId:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'Comment'
    }

})

const Comments = mongoose.model('Comments',CommentsSchema)

export default Comments