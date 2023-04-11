import mongoose from 'mongoose'
import speakingurl from 'speakingurl'

const Schema = mongoose.Schema

const CategorySchema = new Schema({
    name: {
        unique:true,
        type: String,
        required: true,
        trim:true
    },
    slug: {
        unique: true,
        type: String
    }
})

CategorySchema.pre('validate', function(next) {
    this.slug = speakingurl(this.name, {
      maintainCase: false,
      separator: '_',
      custom: {
        '+': '-plus'
      }
    });
    console.log(this.slug);
    next();
  });

const Category = mongoose.model('Category',CategorySchema)

export default Category