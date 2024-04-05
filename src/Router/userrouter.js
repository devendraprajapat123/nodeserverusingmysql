import express from 'express'
import { Login, forgotepass, getuser, register } from '../controller/usercontroller.js'

const userrouter = express.Router()

userrouter.post('/register', register)
userrouter.post('/login', Login)
userrouter.get('/user', getuser)
userrouter.put('/forgote', forgotepass)

export default userrouter;