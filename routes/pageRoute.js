import express from 'express'
import getPage from "../controllers/pageController.js"
import RedirectMiddlewares from '../middlewares/Redirects.js'

const router = express.Router()

router.get('/', getPage.getIndexPage)
router.get('/about', getPage.getAboutPage)
router.get('/register', getPage.getRegisterPage)
router.get('/contact', getPage.getContactPage)
router.post('/contact', getPage.postEmail)
// router.get('/gpt', getPage.getGptPage)
router.get('/login', RedirectMiddlewares.loginMw,getPage.getLoginPage)
router.get('/dashboard',RedirectMiddlewares.dashboardMw,getPage.getDashboardPage)

export default router
