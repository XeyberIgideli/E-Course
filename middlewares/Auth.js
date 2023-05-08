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

}

const authMiddlewares = new AuthMiddleware()

export default authMiddlewares