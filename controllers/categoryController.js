import Category from '../models/Category.js'

class categoryOperations {
    createCategory = async (req,res) => {
        try {
            const category = await Category.create(req.body)
            res.status(201).json({
                status: 'success',
                category
            })
        } catch (error) {
            res.status(400).json({
                status:'failed',
                error
            })
        }
    }
    
}

const CategoryOperations = new categoryOperations()

export default CategoryOperations