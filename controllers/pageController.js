import User from '../models/User.js'
import Course from '../models/Course.js'
import { Configuration, OpenAIApi } from "openai";
import Category from '../models/Category.js'
import nodemailer from 'nodemailer'

class Pages {
    getIndexPage = async (req,res) => {
        const userCount = await User.find({role:'student'}).countDocuments()     
        const teacherCount = await User.find({role:'teacher'}).countDocuments()     
        const courseCount = await Course.find().countDocuments()     
        res.status(200).render('index',{
            page_name:'index',
            userCount,
            courseCount,
            teacherCount
        })
    }

    getAboutPage = (req,res) => {
        res.status(200).render('about',{page_name:'about'})
    }

    getCoursesPage = (req,res) => {
        res.status(200).render('courses',{page_name:'courses'})
    }

    getRegisterPage = (req,res) => {
        res.status(200).render('register',{page_name:'register'})
    }

    getLoginPage = (req,res) => {
        res.status(200).render('login',{page_name:'login'})
    }

    getDashboardPage = async (req,res) => {
        const userData = await User.findOne({_id:req.session.userID}).populate('enrolledCourses')
        const coursesByTeacher = await Course.find({user: req.session.userID}).populate('user')
        const categories = await Category.find()
        res.status(200).render('dashboard',
        {
            page_name:'dashboard',
            userData,
            categories,
            coursesByTeacher
        })
    }

    getContactPage = (req,res) => {
        res.status(200).render('contact',{page_name:'contact'})
    }
    
    postEmail = (req,res) => {
        // console.log(req.body)
    } 

}

const getPage = new Pages()

export default getPage