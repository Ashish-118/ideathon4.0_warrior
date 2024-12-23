import React, { useState } from "react";
import "../customStyle/style.css";
import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (2).png"
import axios from "axios"
import Home from '../pages/home.jsx';
import useUser from "../context/user.jsx";
import { useNavigate } from "react-router-dom";
import { LoginApi } from "../ApiCalls/api.js";
function Login() {
    const navigate = useNavigate();

    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [message, setMessage] = useState("")


    const { setUser } = useUser();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // Make API call using Axios
            const response = await axios.post("http://localhost:8000/api/v1/users/Login", {
                username,
                email,
                password,
            });
            console.log(response)
            if (response.status === 200) {
                const token = response.data.data.accessToken;
                ;
                console.log(response.data)
                console.log("Login successful, token:", token);
                setUser(response.data)
                // Store token in localStorage
                localStorage.setItem("token", token);

                // Navigate to the home page
                navigate("/");
            }
        } catch (error) {
            console.error("Error during login:", error);

            // Handle specific error messages
            if (error.response) {
                setMessage(error.response.data.message || "Login failed. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please check your network.");
            }
        }
    };

    return (
        <div className="flex h-screen">

            <div className=" h-full w-[28%] bg-white place-content-center ">
                <h1 className="text-Login text-3xl font-bold  text-center">Login</h1>
                <form className="my-4 flex flex-col place-content-center ">
                    <input
                        type="text"
                        placeholder="username"
                        value={username}
                        className=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple"
                        onChange={(e) => setusername(e.target.value)}


                    />

                    <input
                        type="text"
                        placeholder="Email"
                        value={email}
                        className=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple"
                        onChange={(e) => setemail(e.target.value)}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        className=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple"
                        onChange={(e) => setpassword(e.target.value)}

                    />

                    <button
                        className=" cursor-default bg-Custompurple text-white  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple text-2xl font-bold font-baloo hover:bg-purple-700"
                        type="submit" onClick={handleLogin}>Login
                    </button>
                </form>

            </div>

            <div className=" h-full w-[72%] bg-bodyBg   flex justify-center items-center">

                <img src={compLogo} className="max-w-full max-h-full w-[150px] " alt="" />
            </div>

        </div >



    )
}


export default Login;