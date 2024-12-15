import React, { useState } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../redux/slices/userSlice";
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
function Signup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowpassword] = useState(false);
  const [isSignupform, setissignupform] = useState(true);
  

  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [bio,setBio] = useState("")
  const [userimage, setUserimage] = useState('')
  const [isLoading, setIsloading] = useState(false)

  const handleLoginform = async (event) => {
    setIsloading(true)
    event.preventDefault();
    if (email.trim().length < 5) toast.error("Please enter a valid email");
    // call backend api to login
    try {
      const res = await axios.post(
        `${BACKEND_URL}/login`,
        { email, password },
        { withCredentials: true }
      );
      
        setIsloading(false)
        toast.success(res.data.message);
      dispatch(addUser(res.data.user));
      navigate("/");
      
    } catch (error) {
      toast.error(error.response.message);
    }
  };
  const handleSignupform = async(event) => {
    setIsloading(true)
    event.preventDefault()
    const formData = new FormData();
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('age',age)
    formData.append('gender',gender.toLocaleLowerCase())
    formData.append('bio',bio)
    formData.append('userimage',userimage)
    try {
      const res = await axios.post(
        `${BACKEND_URL}/signup`,
        formData,
        { withCredentials: true }
      );
      toast.success(res.data.message);
      dispatch(addUser(res.data.user));
      navigate("/");
      setIsloading(false)
      console.log(res)
    } catch (error) {
      console.log(error)
      toast.error(error.response.data)
      setIsloading(false)
    }
  };

  return (
    <div className=" px-5 h-screen flex flex-col md:absolute md:top-0 md:bottom-0 md:left-0 md:right-0 z-[999] absolute   justify-between md:w-[39%] md:ml-auto md:mr-auto md:mt-0 md:rounded-xl bg-white md:h-[110%] ">
      <div>
        <h1 className="text-center text-2xl mb-0 font-bold text-black">
          {" "}
          {isSignupform ? "Signup" : "Login"}{" "}
        </h1>
        <div className="w-[12vw] h-[12vw] md:w-[2.5vw] md:h-[2.5vw] bg-violet-100 ml-auto mr-auto rounded-full ">
          <img
            src="https://png.pngtree.com/png-clipart/20231019/original/pngtree-user-profile-avatar-png-image_13369988.png"
            alt="user_image"
            className="w-full h-full object-cover"
          />
        </div>

        {
          isSignupform && <><label className="text-sm mt-1 md:block">
          Choose a profile picture:
        </label>
        <input
          type="file"
          className="mt-2 mb-2 bg-violet-50 rounded-r-md"
          onChange={(event) => setUserimage(event.target.files[0])}
          name="userimage"
          accept="image/jpeg, image/png, image/jpg"
        /></>
        }

        <form>
          {isSignupform && (
            <div>
              <label className="md:text-sm">First Name</label>
              <div className="flex gap-4 mb-1">
                <input
                  id="firstName"
                  required
                  value={firstName}
                  onChange={(event) => setFirstname(event.target.value)}
                  className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 md:py-2 border  text-lg md:text-sm  placeholder:text-base"
                  type="text"
                  placeholder="Your first name"
                />
              </div>

              <label className="md:text-sm">Last Name</label>
              <div className="flex gap-4 mb-1">
                <input
                  id="lastName"
                  required
                  value={lastName}
                  onChange={(event) => setLastname(event.target.value)}
                  className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg md:text-sm placeholder:text-base"
                  type="text"
                  placeholder="Your last name"
                />
              </div>

              <label className="md:text-sm">Gender</label>
              <div className="flex gap-4 mb-1">
                <input
                  id="gender"
                  required
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg md:text-sm  placeholder:text-base"
                  type="text"
                  placeholder="male female other"
                />
              </div>

              <label className="md:text-sm">Bio</label>
              <div className="flex gap-4 mb-1">
                <input
                  id="bio"
                  required
                  value={bio}
                  onChange={(event) => setBio(event.target.value)}
                  className="bg-[#eeeeee] w-full rounded-lg px-4 py-2 border  text-lg md:text-sm placeholder:text-base"
                  type="text"
                  placeholder="qualification/income/mob no etc"
                />
              </div>
            </div>
          )}
          <h3 className="text-lg md:text-sm font-medium mb-1">What's your email</h3>
          <input
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className="bg-[#eeeeee] mb-4 rounded-lg px-4 py-2 border w-full text-lg md:text-sm placeholder:text-base"
            type="email"
            placeholder="email@gmail.com"
          />

          <h3 className="text-lg md:text-sm font-medium">Enter Password</h3>

          <input
            className="bg-[#eeeeee] mb-0 rounded-lg px-4 py-2 border w-full text-lg md:text-sm placeholder:text-base"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            type={showPassword ? "text" : "password"}
            autoComplete="true"
            placeholder="password"
          />
          <p
            className="text-end text-sm font-semibold cursor-pointer"
            onClick={() => setShowpassword(!showPassword)}
          >
            {showPassword ? "Hide password" : "show password"}
          </p>

          {isSignupform && (
            <div>
              <h6 className="text-lg font-medium mt-[-10px] md:text-sm">Enter Age</h6>
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
          )}
          {isLoading && <p className="text-xl text-center font-semibold text-black mt-2 mb-1">processing ▄︻デ══━一💥</p>}
          <button
            onClick={(event) => {
              isSignupform ? handleSignupform(event) : handleLoginform(event);
            }}
            className="bg-[#111] text-white font-semibold  rounded-lg px-4 py-2 w-full text-lg placeholder:text-base mt-3 md:mt-5"
          >
            {isSignupform ? "Create Account" : "Login and continue"}
          </button>
        </form>

        <h2 className="text-center">
          {isSignupform
            ? "Already have a account ?"
            : "Don't have an account ?"}
          <span
            onClick={() => setissignupform((prev) => !prev)}
            className="text-blue-600 cursor-pointer mx-2"
          >
            {!isSignupform ? "Signup here" : "Login here"}
          </span>
        </h2>
      </div>
      <div>
        <p className="text-[10px] mt-1 leading-tight">
          This site is protected by reCAPTCHA and the{" "}
          <span className="underline">Google Privacy Policy</span> and{" "}
          <span className="underline">Terms of Service apply</span>.
        </p>
      </div>
    </div>
  );
}

export default Signup;
