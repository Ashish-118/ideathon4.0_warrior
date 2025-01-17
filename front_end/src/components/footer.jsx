import React from "react";
import { HiHome } from "react-icons/hi";
import { Link } from 'react-router-dom';
import companyLogo from "../assets/logo/qa (2).png"
import { HiOutlineArrowCircleRight } from "react-icons/hi";

function footer() {
    const currentDate = new Date();
    const year = currentDate.getFullYear();
    return (
        <footer class=" rounded-lg  bg-gray-900  w-full shadow-xl "  >
            <div class="w-full max-w-screen-xl mx-auto p-4 md:py-8">
                <div class="sm:flex sm:items-center sm:justify-between">
                    <a href="/" class="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse">
                        <img src={companyLogo} class="h-12" alt="Q&A" />
                        <span class="self-center text-2xl font-semibold whitespace-nowrap text-white">Have Doubt?</span>
                    </a>
                    <ul class="flex flex-wrap items-center mb-6 text-sm font-medium  sm:mb-0 text-gray-400">
                        <li>
                            <a href="#" class="hover:underline md:me-6">
                                <HiHome class="mt-4 mr-4" />
                            </a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Privacy Policy</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline me-4 md:me-6">Licensing</a>
                        </li>
                        <li>
                            <a href="#" class="hover:underline">About us</a>
                        </li>
                    </ul>
                </div>
                <hr class="my-6  sm:mx-auto border-gray-700 lg:my-8" />
                <span class="block text-sm  sm:text-center text-gray-400">© {year} <a href="" class="hover:underline">Q&A</a>. All Rights Reserved.</span>
            </div>
        </ footer>


    )
}

export default footer;