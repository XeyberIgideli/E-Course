import User from '../models/User.js'
class AuthMiddleware {
    isEmailExist = async(req,res,next) => {
        const email = await User.find({email:req.body.email})
        if (email.length > 0) {
            req.flash('error', 'E-mail already in use!')
            res.status(400).redirect('/register')
        } else {
         next()
        }
    }

    checkForm = async(req,res,next) => {
          if(!req.body.name) {
            req.flash('error', 'Please provide your name!')
            res.status(400).redirect('/register')
        } else if(!req.body.email) {
            req.flash('error', 'Please provide your email adress!')
            res.status(400).redirect('/register')
        } else if(!req.body.password) {
            req.flash('error', 'Please provide a password!')
            res.status(400).redirect('/register')
        } else {
            next()
        }
    }

}

const authMiddlewares = new AuthMiddleware()

export default authMiddlewares