import express from 'express'
import { Login, Signup, leaveApplication } from '../controller/userController.js'
const route = express.Router()

route.post('/register',Signup)
route.post('/login',Login)
route.post('/leaveapplication',leaveApplication)
export default route;