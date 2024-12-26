import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (2).png";
import '../customStyle/style.css';
import { HiArrowNarrowRight } from "react-icons/hi";
import React, { useState } from "react";
// import { Client, Account } from "appwrite";
import axios from "axios"
import useSignup1 from "../context/signup1.jsx";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'


export default function Signup() {
    const [fullName, setfullName] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("");

    const { setSignup1 } = useSignup1();

    const handleSignup1 = async (e) => {
        e.preventDefault();
        console.log(fullName, username, email, password, role)
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/next", {
                username,
                fullName,
                email,
                password,
                role
            })
            console.log(response)
            // if (response.status === 200) {
            //     const token = response.data.data.accessToken;

            //     console.log(response.data)
            //     console.log("Login successful, token:", token);
            //     setSignup1(response.data)
            //     // Store token in localStorage
            //     localStorage.setItem("token", token);
            //     setOpenLock(true)
            //     // Navigate to the home page
            //     setTimeout(() => {

            //         navigate("/");
            //     }, 2500)
            // }
        }
        catch (error) {
            console.error("Error during login:", error);

            // Handle specific error messages
            if (error.response) {
                setMessage(error.response.data.message || "Login failed. Please try again.");
            } else {
                setMessage("An unexpected error occurred. Please check your network.");
            }
        }
    }


    return (
        <>
            <div className="modal-overlay flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="modal">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src={compLogo}
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Sign up
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Fullname
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullName"
                                        value={fullName}
                                        onChange={(e) => setfullName(e.target.value)}
                                        name="fullName"
                                        type="text"
                                        required
                                        autoComplete="fullName"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>
                            <Menu as="div" className="relative inline-block text-left">
                                <div>
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

                                    >

                                        {role === "" ? "Role" : role}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                    </MenuButton>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { setRole('admin') }}
                                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                        } w-full text-left block px-4 py-2 text-sm`}
                                                >
                                                    Admin
                                                </button>
                                            )}
                                        </MenuItem>
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    onClick={() => { setRole('student') }}
                                                    className={`${active ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                                        } w-full text-left block px-4 py-2 text-sm`}
                                                >
                                                    Student
                                                </button>
                                            )}
                                        </MenuItem>
                                    </div>
                                </MenuItems>
                            </Menu>

                            <div>
                                <button
                                    onClick={handleSignup1}
                                    className="relative flex w-full items-center justify-center rounded-md bg-Custompurple px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <p>Next</p>
                                    <HiArrowNarrowRight className="absolute right-3" />
                                </button>
                            </div>
                        </form>



                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an Account?{' '}
                            <a href="#" className="font-semibold text-Custompurple hover:text-purple-700">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}