import Course from '../models/Course.js'
import User from '../models/User.js'
import Category from '../models/Category.js'
import Comments from '../models/Comments.js'

class courseOperations {
    createCourse = async (req,res) => {
        try {
            const courseData = await Course.create({...req.body, user:req.session.userID})
            req.flash("success","Your course has been created!")
            res.status(200).redirect('/courses')
        } catch (error) {
            req.flash("error","Something wrong happened!")
            res.status(400).redirect('/courses')
        }
    }

    getAllCourses = async(req,res) => {
        try {
            const categoryQuery = req.query.category
            const searchQuery = req.query.search
            let filter = {}
            
            if(categoryQuery) {
                const courseByQuery = await Category.findOne({slug:categoryQuery})
                filter = {category:courseByQuery._id}
            } else if(searchQuery) {
                filter = {title:new RegExp('.*' + searchQuery + '.*', 'i')};
            } else {
                 filter = null
            } 
            
            const coursesData = await Course.find(filter).sort('-createdAt').populate('user') 
            const categoryData = await Category.find() 
            res.status(200).render('courses', {
                coursesData,
                categoryData,
                page_name: 'courses'
            })
        } catch(error) {
            res.status(400).json({
                status:'failed',
                error
            })
        }
    }

    getCourse = async(req,res) => {
        const course = await Course.findOne({slug:req.params.slug}).populate('user')
        const user = await User.findById(req.session.userID)
        const comments = await Comments.find({course:course.id}).populate('user')
        const categoryData = await Category.find()

        try {
            res.status(200).render('course',{
                course,
                categoryData,
                userRole: req.session.userRole,
                userSID: req.session.userID,
                user,
                page_name: 'course',
                comments
            })
        } catch(error) {
            res.status(400).json({
                status:'failed',
                error
            })
        } 
    }  

    enrollCourse = async(req,res) => {
        try {
            const user = await User.findById(req.session.userID)
            await user.enrolledCourses.addToSet({_id:req.body.course_id})
            await user.save()

            res.status(200).redirect('/dashboard')
        } catch (err) {
            res.status(400).json({
                status: 'failed',
                err
            })
        }
    }

    releaseCourse = async (req,res) => {
        try {
            const user = await User.findById(req.session.userID) 
            await user.enrolledCourses.pull({_id:req.body.course_id})
            await user.save()

            res.status(200).redirect('/dashboard')
        } catch (err) {
            res.status(400).json({
                status: 'failed',
                err
            })
        }
    }

    deleteCourse = async(req,res) => {
        try {
            const course = await Course.findOneAndRemove({slug:req.params.slug})
            req.flash("error","The Course has been removed successfully")
            res.status(200).redirect('/dashboard')
        } catch(error) {
            res.status(400).json({
                error
            })
        }
    }

    sendMessage = async(req,res) => {
        try {
            const messageData = await Comments.create({
                ...req.body,
                user:req.session.userID,
                parentId: req.body.parentId ?? null,
            })  
            res.redirect('/courses/' + req.params.slug)
        } catch(error) {
            res.status(400).json({
                error
            })
        }
    }

}
const CourseOperations = new courseOperations()

export default CourseOperations