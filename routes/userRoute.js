import express from 'express' 
import AuthOperations from "../controllers/authController.js"
import authMiddlewares from '../middlewares/Auth.js'
import fileMiddlewares from '../middlewares/Files.js'

const router = express.Router() 

router.post('/signup',authMiddlewares.isEmailExist,authMiddlewares.checkForm,
    fileMiddlewares.checkImageUpload(['png', 'jpeg', 'jpg', 'gif'],['image/png', 'image/jpeg', 'image/jpg', 'image/gif'],'avatarImg'),
    AuthOperations.createUser);

router.post('/login',AuthOperations.loginUser) // http://localhost:3000/auth/login  
router.get('/logout',AuthOperations.logoutUser) 
export default router


