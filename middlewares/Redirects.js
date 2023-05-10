import User from '../models/User.js'

class Redirects { 
    dashboardMw = async (req,res,next) => {
       const userData = await User.findById(req.session.userID)
       if(!userData) {
           res.redirect('login')
        } else {
            next()
        }
    }
    loginMw = async (req,res,next) => {
        if(req.session.userID) {
            res.redirect('/')
        } else {
            next()
        }
    }
    notFound = (req,res,next) => {
        res.status(404).send('Page not found!')
    } 
}

const RedirectMiddlewares = new Redirects()

export default RedirectMiddlewares