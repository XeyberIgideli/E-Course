import express from 'express'
import CourseOperations from '../controllers/courseController.js'
import roleMiddleware from '../middlewares/Role.js'

const router = express.Router()

router.post('/',roleMiddleware(["admin","teacher"]),CourseOperations.CreateCourse) // http://localhost:3000/courses
router.get('/',CourseOperations.getAllCourses)
router.get('/:slug',CourseOperations.getCourse)
router.post('/enroll',CourseOperations.enrollCourse)
router.post('/release',CourseOperations.releaseCourse)
// router.post('/courses/new',CourseOperations.new) 
// Bele olsaydi link bu cur olardi: http://localhost:3000/courses/new
export default router