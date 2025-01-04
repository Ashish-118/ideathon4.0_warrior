import React, { useState, useEffect } from "react";
import collegeList from '../assets/collegeData.js';
import { HiChevronDown, HiOutlineSearch } from "react-icons/hi";
import axios from "axios"
import usePyq from "../context/getPyq"
function FilterPyq() {
    const [collegeName, setCollegeName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [year, setYear] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [disabledButtons, setDisabledButtons] = useState({}); // Track disabled state for each button

    const { Pyq, setPyq } = usePyq();

    const filterPyq = async () => {

        try {
            const filteredPyqResponse = await axios.post("http://localhost:8000/api/v1/users/pyq/filter", {
                collegeName: collegeName || null,
                forYear: year || null,
                courseCode: courseCode || null,

            })
            console.log(filteredPyqResponse)
            if (filteredPyqResponse.status === 200) {
                setPyq(Array.from(filteredPyqResponse.data.data))
            }
        } catch (error) {
            console.error("Error while filtering  PYQs:", error);
        }
    }
    useEffect(() => {

        console.log("hello i am useEffect ", year, courseCode, collegeName);
        if (collegeName || year || courseCode) {

            filterPyq()
        }
    }, [collegeName, year, courseCode])

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleCollegeSelect = (college) => {
        setCollegeName(college);
        console.log(year, courseCode, collegeName);
        setIsDropdownOpen(false);
    };

    const handleYearClick = (yearValue) => {
        setYear(yearValue);

        setDisabledButtons({ [yearValue]: true });
    };

    return (
        <div className="w-[220px] ml-5 border h-[550px] text-center rounded-[10px] bg-filterBG items-center sticky ">
            <h1 className="text-menuItem text-3xl font-mono mt-[30px] underline underline-offset-4">Filters</h1>
            <h2 className="text-menuItem font-baloo text-xl font-bold mt-[30px] mb-[10px] ">year of study :</h2>
            <div className="flex flex-col items-center">
                {[
                    { label: "1st year", value: "1" },
                    { label: "2nd year", value: "2" },
                    { label: "3rd year", value: "3" },
                    { label: "4th year", value: "4" },
                    { label: "5th year", value: "5" },
                ].map((yearObj, index) => (
                    <button
                        key={index}
                        value={yearObj.value}
                        onClick={(e) => handleYearClick(e.target.value)}
                        className={`mt-2 rounded-[7px] text-center w-[150px] h-[40px] ${disabledButtons[yearObj.value] ? "bg-gray-400 cursor-not-allowed" : "bg-Custompurple hover:bg-purple-700"
                            } text-white font-baloo text-xl flex items-center justify-center`}
                        disabled={disabledButtons[yearObj.value]}
                    >
                        {yearObj.label}
                        <HiChevronDown className="ml-6" />
                    </button>
                ))}
            </div>
            <div className="flex justify-center items-center mt-[50px]  mb-[20px]">
                <input
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    type="text"
                    placeholder="course code"
                    className="rounded-[7px] w-[150px] ring-4 ring-purple-700  h-[40px] bg-bodyBg text-center text-gray-600 font-baloo text-xl"
                />

            </div>

            <div className="relative">
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {collegeName || "Select College"}
                    <HiChevronDown className="w-2.5 h-2.5 ml-3" />
                </button>

                {isDropdownOpen && (
                    <div id="dropdown" className="absolute bottom-full mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44">
                        <div className="py-1 overflow-y-scroll h-[200px]">
                            {collegeList.map((college, index) => (
                                <button
                                    key={index}
                                    value={college}
                                    onClick={(e) => {

                                        handleCollegeSelect(e.target.value)
                                    }}
                                    className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                >
                                    {college}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilterPyq;
