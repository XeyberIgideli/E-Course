import User from '../models/User.js' 
import fs from 'fs'
import bcrypt from 'bcrypt'
import path from 'path'
import helper from '../utils/helper.js'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

class authOperations {
    createUser = async (req,res) => {
        try { 
            let uploadedImage = req.files.avatarImg 
            let imageExt = uploadedImage.name.substring(uploadedImage.name.lastIndexOf('.'))
            let uniqueImageName = helper.uniqueID(uploadedImage.name.substring(0,uploadedImage.name.lastIndexOf('.')),8)
            let uploadPath = __dirname + '/../public/uploads/' + uniqueImageName + imageExt
            // if(req.body) {
                uploadedImage.mv(uploadPath,async () => {
                    await User.create({
                        ...req.body,
                        avatarImg: '/uploads/' + uniqueImageName + imageExt
                    })                 
                })
                res.status(201).redirect('/login')
            // }

        } catch (error) {
            req.flash('error', 'Something went wrong!')
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
                    req.flash('error','Your password is not correct!')
                    res.status(401).redirect('/login')
                }
            } else {
                req.flash('error','Your email is not correct!')
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