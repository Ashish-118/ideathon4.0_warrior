import compLogo from "../../assets/logo/qa (2).png"
import '../../customStyle/style.css';
import { HiArrowNarrowRight } from "react-icons/hi";
import React, { useState } from "react";
// import { Client, Account } from "appwrite";
import axios from "axios"
import useSignup1 from "../../context/signup1.jsx";
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/20/solid'
import { PiXCircleFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";


export default function Signup_1(props) {
    const navigate = useNavigate();

    const [fullName, setfullName] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [role, setRole] = useState("");
    const [emailError, setemailError] = useState(false)
    const [CredentialsError, setCredentialsError] = useState(false)
    const [accountExistError, setaccountExistError] = useState(false)
    const { setSignup1 } = useSignup1();


    const handleSignup1 = async (e) => {
        e.preventDefault();
        console.log(fullName, username, email, password, role)
        const eduInRegex = /^[^\s@]+@[^\s@]+\.edu\.in$/;


        try {

            if (fullName === "" || username === "" || password === "" || role === "" || email === "") {
                setCredentialsError(true)
                setTimeout(() => {
                    setCredentialsError(false)
                }, 5000)
                return;
            }
            if (!eduInRegex.test(email)) {
                setemailError(true)
                setTimeout(() => {
                    setemailError(false)
                }, 5000)
                return;
            }

            const response = await axios.post("http://localhost:8000/api/v1/users/next", {
                username: username.trim(),
                fullName: fullName.trim(),
                email: email.trim(),
                password: password.trim(),
                role
            })
            console.log(response)
            if (response.status === 201) {
                setSignup1(response)
            }
        }
        catch (error) {
            if (error.status === 409) {
                setaccountExistError(true)
                setTimeout(() => {
                    setaccountExistError(false)
                }, 6000)
            }
            console.error("Error during signup:", error);

            if (error.response) {
                console.error(error.response.data.message || "part 1 of singup failed. Please try again.");
            }
        }
    }


    return (
        <>
            <div className="modal-overlay flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="modal">
                    <PiXCircleFill
                        className="text-red-700 w-5 h-5 "
                        onClick={props.closeSignup1}
                    />
                    <div className="sm:mx-auto flex flex-col items-center sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src={compLogo}
                            className="mx-auto h-10 w-auto"
                        />
                        {
                            CredentialsError && <h4 className="text-red-600 text-center">All fields are required !!!</h4>
                        }

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
                                    <span className="text-red-500 ml-[80px]">{emailError && "Format should be .edu.in"}</span>
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
                                <div className="flex ">
                                    <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"

                                    >

                                        {role === "" ? "Role" : role}
                                        <ChevronDownIcon aria-hidden="true" className="-mr-1 size-5 text-gray-400" />
                                    </MenuButton>

                                    <div>
                                        {accountExistError && <h4 className="text-red-600 text-center">Acount exists already !!!</h4>}
                                    </div>
                                </div>

                                <MenuItems
                                    transition
                                    className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                >
                                    <div className="py-1">
                                        <MenuItem>
                                            {({ active }) => (
                                                <button
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setRole('admin')
                                                    }}
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
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setRole('student')
                                                    }}
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
                            <a href="/login" className="font-semibold text-Custompurple hover:text-purple-700">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}