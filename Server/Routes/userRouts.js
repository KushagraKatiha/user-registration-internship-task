import express from 'express'
import { deleteUser, signIn, signOut, signUp, updateUser, userDetails } from '../controllers/userControllers.js'
import authToken from '../middleware/authToken.js'
import { upload } from '../middleware/multer.js'
const Router = express.Router()

Router.post('/signup', upload.single('avatar') ,signUp)
Router.post('/signin', signIn)
Router.post('/signout', authToken, signOut)
Router.delete('/delete', authToken, deleteUser)
Router.put('/update', authToken, updateUser)
Router.get('/details', authToken, userDetails)

export default Router


