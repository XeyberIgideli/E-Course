import express from 'express'
import User from '../models/User.js'
import {body,validationResult} from 'express-validator'
import AuthOperations from "../controllers/authController.js"

const router = express.Router() 

// function findByUserEmail2(value) {
//     return new Promise((req,res) => {
//         User.findOne({emai:value},(err,user) => {
//             if(err) {
//                 reject(err)
//             } else {
//                 resolve(user)
//             }

//         })
//     })
// }

router.post('/signup',
    [
        body('name').not().isEmpty().withMessage('Please Enter Your Name'),
        body('email').isEmail().normalizeEmail().withMessage('Please Enter Valid Email'),
        body('password').not().isEmpty().withMessage('Please Enter A Password'),
    ],async(req,res,next) => {
        return User.find({email:req.body.email}).then(user => {
            if (user.length > 0) {
                req.flash('error', 'E-mail already in use!')
                res.status(400).redirect('/register')
            } else {
             next()
            }
        })
    },AuthOperations.createUser);
router.post('/login',AuthOperations.loginUser) // http://localhost:3000/auth/login  
router.get('/logout',AuthOperations.logoutUser) 
export default router


