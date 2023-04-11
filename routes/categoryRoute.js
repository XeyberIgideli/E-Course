import express from 'express'
import CategoryOperations from "../controllers/categoryController.js"

const router = express.Router()

router.post('/',CategoryOperations.createCategory)

export default router


