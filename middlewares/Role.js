import User from '../models/User.js'

export default (roles) => {
    return async (req,res,next) => {
        const userRole = await User.findById({_id: req.session.userID})
        if(roles.includes(userRole.role)) {
            next()
        } else {
            res.status(401).send('not authorized')
        }
    }
}