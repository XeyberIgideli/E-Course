import Category from '../models/Category.js'
import {validationResult} from 'express-validator'

class categoryOperations {
    createCategory = async (req,res) => {
        try {
            const category = await Category.create(req.body)
            res.status(201).redirect('/dashboard')
        } catch (error) {
            const errors = validationResult(req) 
            errors.array().map(item => req.flash('error',`${item.msg}`))
            res.status(400).redirect('/dashboard')
        }
    }
    
}

const CategoryOperations = new categoryOperations()

export default CategoryOperations