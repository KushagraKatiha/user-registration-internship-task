import { useNavigate } from 'react-router-dom'
import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

function Signin() {

  const navigate = useNavigate()

  const [input, setInput] = useState("")
  const [password, setPassword] = useState("")

  let handleFormSubmit = async ()=>{
    try {
      const response = await axios.post('http://localhost:5000/signin', {
        email: input,
        password: password,
      }, {withCredentials: true});
      console.log(response.data); // Assuming the response contains JSON data.
      console.log(response.status);
      if (response.status === 200) {
        alert('User Login successfull');
        setInput("")
        setPassword("")
      }

      if(response.status !== 400){
        navigate('/profile');
      }

    } catch (error) {
      alert("Invalid Credentials")
      console.error(error);
    }
    
  }
  
  return (
    <>
      <section className='h-screen w-full flex'>
        <div className="flex m-auto backdrop-blur-md py-7 px-10 border-white border rounded-lg items-center ">
          <div className="xl:mx-auto xl:w-full xl:max-w-sm 2xl:max-w-md">
            <h2 className="text-2xl font-bold leading-tight text-white">
              Sign in to your account
            </h2>
            <p className="mt-2text-sm text-white ">
              Don&#x27;t have an account? &nbsp; 
            </p>
            <Link 
                to={'/'}
              >
               <span className="font-semibold text-blue-600 transition-all duration-200 hover:underline">Create a free account</span> 
              </Link>
            <form action="#" method="POST" className="mt-8">
              <div className="space-y-5">
                <div>
                  <label htmlFor="email" className="text-base font-medium text-white">
                    Email
                  </label>
                  <div className="mt-2">
                    <input
                      id='email'
                      className="flex h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50 text-white"
                      type="email"
                      value={input}
                      onChange={(e)=>setInput(e.target.value)}
                      placeholder="Email"
                    />
                  </div>
                </div>
                <div>
                  <div className="flex items-center justify-between">
                    <label htmlFor="password" className="text-base font-medium text-white">
                      {" "}
                      Password{" "}
                    </label>
                  </div>
                  <div className="mt-2">
                    <input
                      id='password'
                      className="flex text-white h-10 w-full rounded-md border border-gray-300 bg-transparent px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:ring-offset-1 disabled:cursor-not-allowed disabled:opacity-50"
                      type="password"
                      value={password}
                      onChange={(e)=>setPassword(e.target.value)}
                      placeholder="Password"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="button"
                    onClick={handleFormSubmit}
                    className="inline-flex w-full items-center justify-center rounded-md bg-white px-3.5 py-2.5 font-semibold leading-7 text-black hover:bg-black/80 hover:text-white"
                  >
                    Get started
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

export default Signin