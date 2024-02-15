import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signup() {

  const navigate = useNavigate();

  const [name, setName] = useState("")
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [selectedFile, setSelectedFile] = useState(null)

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  
  let handleFormSubmit = async () => {
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('username', username);
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);
    formData.append('avatar', selectedFile);

    try {
      const response = await axios.post('http://localhost:5000/signup', formData, {headers:{'Content-Type': 'multipart/form-data'}});
      console.log(response.data); // Assuming the response contains JSON data.
      console.log(response.status);
      if (response.status === 201) {
        alert('User created successfully');
        setName("")
        setUsername("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
      }
      if (response.status !== 400) {
        navigate('/signin');
      }
    } catch (error) {
      console.error(error.message);
    }

  }

  return (
    <>
      <section className='h-screen w-full flex'>
        <div className="flex m-auto backdrop-blur-md py-7 px-10 border-white border rounded-lg items-center ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-3xl font-bold leading-tight text-white">
              Sign up to create account
            </h2>
            <p className="mt-2 text-base text-white">
              Already have an account ?
            </p>
            <Link
              to={'/signin'}
              className="font-medium text-blue-600 transition-all duration-200 hover:underline"
            >
              <p>Sign In</p>
            </Link>
            <form className="mt-8">
              {/* Full Name */}
              <div className="space-y-5">
                <div>
                  <label htmlFor="name" className="text-base font-medium text-white">
                    Full Name
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed text-white  disabled:opacity-50"
                      type="text"
                      placeholder="Full Name"
                      id="name"
                      value={name}
                      onChange={(e) => { setName && setName(e.target.value) }}
                    />
                  </div>
                </div>

                {/* Username */}
                <div>
                  <label htmlFor="username" className="text-base font-medium text-white">

                    Username
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed text-white  disabled:opacity-50"
                      type="text"
                      placeholder="User Name"
                      id="username"
                      value={username}
                      onChange={(e) => { setUsername && setUsername(e.target.value) }}
                    />
                  </div>
                </div>
                <div>
                  <label htmlFor="email" className="text-base font-medium text-white">

                    Email address
                  </label>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed text-white  disabled:opacity-50"
                      type="email"
                      placeholder="Email"
                      id="email"
                      value={email}
                      onChange={(e) => { setEmail && setEmail(e.target.value) }}
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">

                      Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed text-white   disabled:opacity-50"
                      type="password"
                      placeholder="Password"
                      id="password"
                      value={password}
                      onChange={(e) => { setPassword && setPassword(e.target.value) }}
                    />
                  </div>
                </div>

                {/* Confirm Password */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword" className="text-base font-medium text-white">

                      Confirm Password
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      placeholder="Confirm Password"
                      id="confirmPassword"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword && setConfirmPassword(e.target.value)
                      }}
                    />
                  </div>
                </div>

                {/* Upload Profile */}
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="confirmPassword" className="text-base font-medium text-white">

                      Upload Profile
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      className="flex h-10 w-full rounded-md border text-white border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="file"
                      id="profile"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button" onClick={handleFormSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-black/80 hover:text-white"
                  >
                    Create Account
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="ml-2"
                    >
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                      <polyline points="12 5 19 12 12 19"></polyline>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  )
}

export default Signup