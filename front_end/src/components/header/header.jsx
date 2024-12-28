import React, { useEffect, useState } from "react";
import compLogo from "../../assets/logo/qa (1).png"
import { HiHome } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import "/Users/ashish/Documents/Warrior/front_end/src/customStyle/style.css"
import { GoArrowUpRight } from "react-icons/go";
import { Link, NavLink } from 'react-router-dom';
import defaultUserLogo from "../../assets/logo/user.png"
import useUser from "../../context/user.jsx";
function header() {

    const [isLoggedIn, setLoggedIn] = useState(false);
    const { user } = useUser();


    useEffect(() => {
        if (user && user?.statusCode == 200) setLoggedIn(true)
        // console.log(user?.data?.user?.username)
    }, [user])
    return (
        <div className="flex shadow-xl bg-gray-200 items-center font-sans h-[75px] sticky top-0 z-50 ">
            <div className="flex ">
                < div className="ml-4 mt-2 " >
                    <img src={compLogo} className="w-[50px] h-[50px]" alt="" />
                </div >
                <div className=" ml-[450px] w-[600px] place-content-center mt-6" >
                    <ul className="flex text-menuItem ">
                        <li className="menuItem ">
                            <NavLink
                                to="/"
                                className={({ isActive }) =>

                                    `  h-[40px] w-[40px] cursor-default items-center flex px-2 rounded-full ${isActive ? "text-white bg-gray-600   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                <HiHome className="w-8 h-5 " />
                            </NavLink>

                        </li>

                        <li className="menuItem  ">
                            <NavLink
                                to="/pyq"
                                className={({ isActive }) =>
                                    `  h-[40px] w-[80px] cursor-default items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`

                                }
                            >
                                PYQ's
                                <GoArrowUpRight className="mt-1 " />
                            </NavLink>


                        </li>

                        <li className="menuItem ">



                            <NavLink
                                to="/book"
                                className={({ isActive }) =>

                                    `  h-[40px] w-[90px] cursor-default items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                Book's
                                <GoArrowUpRight className="mt-1" />
                            </NavLink>
                        </li>

                        <li className="menuItem ">


                            <NavLink
                                to="/about"
                                className={({ isActive }) =>

                                    `  h-[40px] w-[100px] cursor-default items-center flex px-2 rounded-lg ${isActive ? "text-white bg-gray-600 rounded-lg   " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                About us
                                <GoArrowUpRight className="mt-1" />
                            </NavLink>
                        </li>

                        <li className="menuItem ">
                            <NavLink
                                to="/sun"
                                className={({ isActive }) =>

                                    `  h-[40px] w-[40px] cursor-default items-center flex px-2 rounded-full ${isActive ? "text-white bg-gray-600 rounded-full  " : "hover:bg-gray-400 hover:text-white    "}`
                                }
                            >
                                <HiOutlineSun className="w-8 h-6" />
                            </NavLink>

                        </li>
                    </ul>
                </div>
            </div >

            <div className="ml-[200px] text-xl font-bold flex" >
                {/* <h1 className="border">{user?.data?.user?.username || "hello"} </h1> */}
                {
                    (isLoggedIn) ? (

                        <NavLink
                            to="/profile"
                            className={({ isActive }) =>
                                `cursor-default ${isActive ? "text-black bg-gray-600 rounded-lg px-3 py-1.5 flex" : "default flex"}`
                            }
                        >

                            <img
                                src={user?.data?.user?.avatar || defaultUserLogo}
                                className=" w-16 h-16 border-2 border-white rounded-full ml-6 mt-16 object-cover "
                                alt="" />
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