import express from 'express'
import { deleteUser, signIn, signOut, signUp, updateUser } from '../controllers/userControllers'

const Router = express.Router()

Router.post('/signup', signUp)
Router.post('/signin', signIn)
Router.post('/signout', signOut)
Router.delete('/delete', deleteUser)
Router.put('/update', updateUser)

export default Router


