import express from 'express'
import CourseOperations from '../controllers/courseController.js'
import roleMiddleware from '../middlewares/Role.js'
import fileMiddlewares from '../middlewares/Files.js'
const router = express.Router()

router.post('/',roleMiddleware(["admin","teacher"]),fileMiddlewares.checkImageUpload(['png', 'jpeg', 'jpg', 'gif'],['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],'courseImage'),CourseOperations.createCourse) // http://localhost:3000/courses
router.get('/',CourseOperations.getAllCourses)
router.get('/:slug',CourseOperations.getCourse)
router.post('/enroll',CourseOperations.enrollCourse)
router.post('/release',CourseOperations.releaseCourse)
router.delete('/:slug',CourseOperations.deleteCourse)
router.post('/comment/:slug',CourseOperations.sendComment)
router.put('/:slug',CourseOperations.updateCourse)
// router.post('/courses/new',CourseOperations.new) 
// Bele olsaydi link bu cur olardi: http://localhost:3000/courses/new
export default router

