import React, { useState } from "react";
import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (1).png"
import { HiHome } from "react-icons/hi";
import { HiOutlineSun } from "react-icons/hi";
import "/Users/ashish/Documents/Warrior/front_end/src/customStyle/style.css"
import { GoArrowUpRight } from "react-icons/go";
import ashish from "/Users/ashish/Documents/Warrior/front_end/public/logo/Ashish (1).jpeg"
function header() {

    const [isLoggedIn, setLoggedIn] = useState(true);
    return (
        <div class="flex bg-MenuBg items-center font-sans h-[80px] sticky top-0 z-50 ">
            <div class="flex ">
                < div className=" " class="ml-4  " >
                    <img src={compLogo} class="w-[50px] h-[50px]" alt="" srcset="" />
                </div >
                <div className=" ml-[450px] w-[600px] place-content-center mt-6" >
                    <ul class="flex text-menuItem">
                        <li className="menuItem">
                            <a href="">
                                <HiHome class="w-8 h-5 " />
                            </a>
                        </li>

                        <li className="menuItem">
                            <a href="">PYQ's</a>
                            <GoArrowUpRight class="" />
                        </li>

                        <li className="menuItem">
                            <a href="">
                                Book's
                            </a>
                            <GoArrowUpRight class="" />
                        </li>

                        <li className="menuItem">
                            <a href="">
                                About us
                            </a>
                            <GoArrowUpRight class="" />
                        </li>

                        <li className="menuItem">
                            <HiOutlineSun class="w-8 h-6" />
                        </li>
                    </ul>
                </div>
            </div >

            <div className="border" class="ml-[200px] text-xl font-bold" >
                {
                    (isLoggedIn) ? (
                        <img
                            src={ashish}
                            class=" w-16 border-2 border-white rounded-full ml-6 mt-16 "
                            alt="" srcset="" />
                    )
                        :
                        (
                            <button class="bg-Custompurple text-white rounded px-5  py-2 "> Login</button>
                        )

                }

            </div>
        </div >
    )
}

export default header;