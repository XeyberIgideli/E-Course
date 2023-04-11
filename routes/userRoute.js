import express from 'express'
import User from '../models/User.js'
import {body} from 'express-validator'
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
    body('name').not().isEmpty().withMessage('Please fill name field with your name!'),
    body('email').isEmail().withMessage('Please fill Email field with your email!')
    .custom(userEmail => {
        return User.findOne({email:userEmail}).then(user => {
            if(user) {
                console.log(user)
                return Promise.reject('E-mail is exsist already!')
            }
        })
    }),
    body('password').not().isEmpty().withMessage('Please fill password field!'),
],AuthOperations.createUser) // http://localhost:3000/auth/signup 
router.post('/login',AuthOperations.loginUser) // http://localhost:3000/auth/login  
router.get('/logout',AuthOperations.logoutUser) 
export default router


