import React, { useState } from 'react'

function Signup() {

    const [showPassword, setShowpassword] = useState(false)
    const [isSignupform, setissignupform] = useState(true)

    const [firstName, setFirstname] = useState('')
    const [lastName, setLastname] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [gender, setGender] = useState('')
    const [age, setAge] = useState('')

    const handleLoginform = (event) =>{
        alert('login')
    }
    const handleSignupform = (event) =>{
        alert('Signup')
    }

  return (
    <div className="py-2 px-5 h-screen flex flex-col justify-between md:w-[35%] md:ml-auto md:mr-auto md:mt-2 md:rounded-xl bg-white md:h-[98vh]">
    <div>
      <h1 className="text-center text-2xl mb-0 font-bold text-black"> {isSignupform ? 'Signup' : 'Login'} </h1>
      <div className="w-[20vw] h-[20vw] md:w-[6vw] md:h-[6vw] bg-violet-100 ml-auto mr-auto rounded-full ">
        <img
          src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
          alt="user_image"
          className="w-full h-full object-cover"
        />
      </div>

      {/* <label htmlFor="profilePic" className="text-sm mt-1 md:block">
        Choose a profile picture:
      </label>
      <input
        type="file"
        className="mt-2 mb-6 bg-violet-50 rounded-r-md"
         onChange={(event) => setProfilepic(event.target.files[0])} 
        name='avatar'
      /> */}

      <form>
        {
            isSignupform && <div>
            <label className="md:text-lg">First Name</label>
        <div className="flex gap-4 mb-3">
          <input
            id="firstName"
            required
            value={firstName}
            onChange={(event) => setFirstname(event.target.value)}
            className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg  placeholder:text-base"
            type="text"
            placeholder="Your first name"
          />
        </div>

        <label className="md:text-lg">Last Name</label>
        <div className="flex gap-4 mb-3">
          <input
            id="lastName"
            required
            value={lastName}
            onChange={(event) => setLastname(event.target.value)}
            className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg  placeholder:text-base"
            type="text"
            placeholder="Your last name"
          />
        </div>
        </div>

        }
        <h3 className="text-lg font-medium mb-2">What's your email</h3>
        <input
          required
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          type="email"
          placeholder="email@gmail.com"
        />

        <h3 className="text-lg font-medium">Enter Password</h3>

        <input
          className="bg-[#eeeeee] mb-0 rounded-lg px-4 py-2 border w-full text-lg placeholder:text-base"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          required
          type={showPassword ? 'text' : 'password'}
          autoComplete="true"
          placeholder="password"
        />
        <p
          className="text-end text-sm font-semibold cursor-pointer"
          onClick={() => setShowpassword(!showPassword)}
        >
          {showPassword ? 'Hide password' : 'show password'}
        </p>

        {
            isSignupform && <div><h6 className="text-lg font-medium mt-[-10px]">Enter Age</h6>
        <input
          className="bg-[#eeeeee] mb-0 rounded-lg px-4 py-1 border w-full text-lg placeholder:text-base"
          value={age}
          onChange={(event) => setAge(event.target.value)}
          required
          type="number"
          autoComplete="true"
          placeholder="your age"
        />
</div>
        }

        <button
          onClick={(event) => {isSignupform ? handleSignupform(event) : handleLoginform(event)}}
          className="bg-[#111] text-white font-semibold  rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mt-3 md:mt-5"
        >
          Create Account
        </button>
      </form>

      <h2 className="text-center">
        {isSignupform ? 'Already have a account ?' : "Don't have an account ?" }
        <span
          onClick={() => setissignupform(prev => !prev)}
          className="text-blue-600 cursor-pointer mx-2"
        >
          {!isSignupform ? 'Signup here' : 'Login here'}
        </span>
      </h2>

    </div>
    <div>
      <p className="text-[10px] mt-1 leading-tight">
        This site is protected by reCAPTCHA and the{' '}
        <span className="underline">Google Privacy Policy</span> and{' '}
        <span className="underline">Terms of Service apply</span>.
      </p>
    </div>
  </div>
  )
}

export default Signup
