import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import Signin from './Components/SignIn/Signin.jsx'
import Signup from './Components/SignUp/Signup.jsx'
import Profile from './Components/Profile/Profile.jsx'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import UpdateUser from './Components/UpdatePage/UpdatePage.jsx'

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App/>}>

        <Route path='/' element={<Signup/>}/>
        <Route path="signin" element={<Signin/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="updateuser" element={<UpdateUser/>}/>
 
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)
