import mongoose from 'mongoose'
import slugify from 'slugify'

const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title: {
        unique:true,
        type: String,
        required: true,
        trim:true
    },
    description: {
        type: String,
        required: true,
        trim:true
    },
    category: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'Category' 
    },
    courseImage: {
        type:String
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    slug: {
        unique: true,
        type: String
    }
},
{ timestamps: true })

CourseSchema.pre('validate', function(next) {
    // Burada normal funksiya isledildi cunki arrow function this-e sahib deyil
    this.slug = slugify(this.title,{
        lower: true,
        strict: true
    })
    next()
})

const Course = mongoose.model('Course',CourseSchema)

export default Course