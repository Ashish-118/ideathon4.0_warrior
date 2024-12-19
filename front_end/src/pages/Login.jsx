import React from "react";
import "../customStyle/style.css";
import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (2).png"

function Login() {
    return (
        <div class="flex h-screen">

            <div class=" h-full w-[28%] bg-white place-content-center ">
                <h1 class="text-Login text-3xl font-bold  text-center">Login</h1>
                <form class="my-4 flex flex-col place-content-center ">
                    <input
                        type="text"
                        placeholder="username"
                        class=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple" />

                    <input
                        type="text"
                        placeholder="Email"
                        class=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple" />
                    <input
                        type="password"
                        placeholder="Password"
                        class=" bg-bodyBg  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple" />
                    <button
                        class=" bg-Custompurple text-white  rounded-lg text-center m-2 h-[50px]  focus:border-Custompurple text-2xl font-bold font-baloo hover:bg-purple-700"
                        type="submit">Login
                    </button>
                </form>
            </div>

            <div class=" h-full w-[72%] bg-bodyBg   flex justify-center items-center">
                <img src={compLogo} class="max-w-full max-h-full w-[150px] " alt="" />
            </div>

        </div >



    )
}


export default Login;