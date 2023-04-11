import User from '../models/User.js'
import {validationResult} from 'express-validator'
import bcrypt from 'bcrypt'

class authOperations {
    createUser = async (req,res) => {
        try {
            const userSignup = await User.create(req.body)
            res.status(201).redirect('/login')
        } catch (error) {
            const errors = validationResult(req)
            errors.array().map(item => req.flash('error',`${item.msg}`))
            res.status(400).redirect('/register')
        }
    }

    loginUser = async (req,res) => {
        try {
            const {email,password} = req.body
            const userData = await User.findOne({email})
            if(userData) {
                const isSame = await bcrypt.compare(password,userData.password)
                if(isSame) {
                    req.session.userID = userData._id
                    req.session.userRole = userData.role
                    
                    res.status(200).redirect('/dashboard')
                } else {
                    res.status(401).redirect('/login')
                }
            } else {
                res.status(401).redirect('/login')
            }
        } catch (error) {
            res.status(400).json({
                status:'failed',
                error
            })
        }
    }

    logoutUser = (req,res) => {
        req.session.destroy(() => {
            res.status(200).redirect('/')
        })
    }


}

const AuthOperations = new authOperations()

export default AuthOperations