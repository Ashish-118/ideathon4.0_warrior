import React, { useState } from "react";
import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (1).png"
import { HiHome } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import "/Users/ashish/Documents/Warrior/front_end/src/customStyle/style.css"
import { GoArrowUpRight } from "react-icons/go";
import { Link, NavLink } from 'react-router-dom';
import ashish from "/Users/ashish/Documents/Warrior/front_end/public/logo/Ashish (1).jpeg"
function header() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    return (
        <div class="flex bg-MenuBg items-center font-sans h-[75px] sticky top-0 z-50 ">
            <div class="flex ">
                < div className=" " class="ml-4 mt-2 " >
                    <img src={compLogo} class="w-[50px] h-[50px]" alt="" srcset="" />
                </div >
                <div className=" ml-[450px] w-[600px] place-content-center mt-6" >
                    <ul class="flex text-menuItem ">
                        <li className="menuItem ">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>
                                    // isActive ? "text-white bg-gray-600 rounded-[50px] px-1 py-2.5" : "default"
                                    `  h-[40px] w-[40px]  items-center flex px-2 rounded-full ${isActive ? "text-white bg-gray-600   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                <HiHome class="w-8 h-5 " />
                            </NavLink>

                        </li>

                        <li className="menuItem  ">
                            <NavLink
                                to="/pyq"
                                className={({ isActive }) =>
                                    `  h-[40px] w-[80px]  items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`
                                    // isActive ? "text-white bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"
                                }
                            >
                                PYQ's
                                <GoArrowUpRight class="mt-1 " />
                            </NavLink>


                        </li>

                        <li className="menuItem ">



                            <NavLink
                                to="/book"
                                className={({ isActive }) =>
                                    // isActive ? "text-white bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"
                                    `  h-[40px] w-[90px]  items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                Book's
                                <GoArrowUpRight class="mt-1" />
                            </NavLink>
                        </li>

                        <li className="menuItem ">


                            <NavLink
                                to="/about"
                                className={({ isActive }) =>
                                    // isActive ? "text-white bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"
                                    `  h-[40px] w-[100px]  items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                About us
                                <GoArrowUpRight class="mt-1" />
                            </NavLink>
                        </li>

                        <li className="menuItem ">
                            <NavLink
                                to="/sun"
                                className={({ isActive }) =>
                                    // isActive ? "text-white bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"
                                    `  h-[40px] w-[40px]  items-center flex px-2 rounded-full ${isActive ? "text-white bg-gray-600 rounded-full  " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                <HiOutlineSun class="w-8 h-6" />
                            </NavLink>

                        </li>
                    </ul>
                </div>
            </div >

            <div className="border" class="ml-[200px] text-xl font-bold" >
                {
                    (isLoggedIn) ? (

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                isActive ? "text-white bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"
                            }
                        >
                            <img
                                src={ashish}
                                class=" w-16 border-2 border-white rounded-full ml-6 mt-16 "
                                alt="" srcset="" />
                        </NavLink>

                    )
                        :
                        (

                            <NavLink
                                to="/Login"
                                className={({ isActive }) =>
                                    `flex ${isActive ? "bg-purple-700 text-gray-400" : "bg-Custompurple text-white"} rounded px-5 py-2 cursor-default hover:bg-purple-700 hover:text-gray-400`
                                }
                            >
                                Login
                            </NavLink>

                        )

                }

            </div>
        </div >
    )
}

export default header;