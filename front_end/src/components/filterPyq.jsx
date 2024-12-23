import React from "react";
import { HiChevronDown } from "react-icons/hi";
import { HiOutlineSearch } from "react-icons/hi";

function FilterPyq() {
    return (
        <div className="w-[220px] ml-5 border h-[550px] text-center rounded-[10px] bg-filterBG  items-center sticky ">
            <h1 className="text-menuItem text-3xl font-mono  mt-[30px] underline underline-offset-4">Filters</h1>
            <h2 className="text-menuItem font-baloo text-xl font-bold mt-[30px] mb-[10px] ">year of study :</h2>
            <div className="flex flex-col items-center">
                <button className="mt-2 rounded-[7px] text-center w-[150px] h-[40px] bg-Custompurple text-white font-baloo text-xl hover:bg-purple-700 flex items-center justify-center">
                    1st year
                    <HiChevronDown className="ml-6" />
                </button>

                <button className="mt-2 rounded-[7px] text-center w-[150px] h-[40px] bg-Custompurple text-white font-baloo text-xl hover:bg-purple-700 flex items-center justify-center">
                    2nd year
                    <HiChevronDown className="ml-4" />
                </button>

                <button className="mt-2 rounded-[7px] text-center w-[150px] h-[40px] bg-Custompurple text-white font-baloo text-xl hover:bg-purple-700 flex items-center justify-center">
                    3rd year
                    <HiChevronDown className="ml-5" />
                </button>

                <button className="mt-2 rounded-[7px] text-center w-[150px] h-[40px] bg-Custompurple text-white font-baloo text-xl hover:bg-purple-700 flex items-center justify-center">
                    4th year
                    <HiChevronDown className="ml-5" />
                </button>
                <button className="mt-2 rounded-[7px] text-center w-[150px] h-[40px] bg-Custompurple text-white font-baloo text-xl hover:bg-purple-700 flex items-center justify-center">
                    5th year
                    <HiChevronDown className="ml-5" />
                </button>
            </div>
            <h2 className="text-menuItem font-baloo text-xl font-bold mt-[50px] mb-[10px] ">Course Code :</h2>
            <div className="flex justify-center items-center">
                <input
                    type="text"
                    placeholder="course code"
                    className=" rounded-[7px] w-[150px] h-[40px] bg-bodyBg text-center text-gray-600 font-baloo text-xl"
                />
                <HiOutlineSearch className="text-white ml-1 bg-Custompurple text-xl w-[30px] h-[38px] rounded-[7px] hover:bg-purple-700 " />
            </div>
        </div>
    )
}

export default FilterPyq