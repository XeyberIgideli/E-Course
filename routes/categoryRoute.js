import express from 'express'
import CategoryOperations from "../controllers/categoryController.js"
import {body,validationResult} from 'express-validator'

const router = express.Router()

router.post('/',[
    body('name').not().isEmpty().withMessage('Please Enter Category Name Name')
],CategoryOperations.createCategory)

export default router


