import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';


function UpdateUser() {

  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

    let handleSave = async () => {
        try {
            let response = await axios.patch('http://localhost:5000/update', {
                name,
                username,
                email
            }, { withCredentials: true })

            console.log(response.data); // Assuming the response contains JSON data.
            console.log(response.status); // Assuming the response contains JSON data.
            
            if(response.status === 200){
                alert('User Updated !')
                navigate('/profile')
            }

        } catch (error) {
            console.log(error.message);
        }
       
    }

  return (
    <section className='h-screen w-full flex'>
      <div className='m-auto w-4/5 md:w-2/4 md:h-5/6 h-auto backdrop-blur-md border border-white rounded-lg flex flex-col justify-center items-center md:gap-5 gap-4 px-5 py-5 '>
        <h1 className='text-white text-3xl'>Update Details</h1>
        <div className='flex gap-5 justify-center w-full h-5/6 items-center'>
          <div className='flex flex-col md:w-3/4 md:h-3/4 gap-5 justify-center bg-slate-800 px-8 py-8 border-b-4 border-white rounded-lg text-white md:text-lg text-sm '>
        
        {/* Name */}

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

                {/* Email */}
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
          
          </div>
        </div>

        <button onClick={handleSave} className='px-10 text-white bg-blue-600 hover:bg-blue-900 rounded-lg cursor-pointer py-2'>Save</button>
      </div>
    </section>
  );
}

export default UpdateUser;
