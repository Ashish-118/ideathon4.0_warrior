import React, { useState } from "react";
import ashish from "../assets/logo/Ashish (1).jpeg";
function PCard({ pyq }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return (
        <div className="w-[300px] max-w-sm bg-white border border-gray-200 rounded-lg  rounded-t-2xl shadow relative">
            <div className=" w-full h-[35px] flex  items-center ">
                <img src={pyq.profileLink} className="w-[35px] h-[35px] rounded-2xl flex " alt="" srcset="" />
                <h3 className="ml-[200px]">~{pyq.sender}</h3>
                <hr />
            </div>
            <div className="flex justify-end px-4 pt-4">
                <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>


                <div
                    id="dropdown"
                    className={`z-10 ${isDropdownOpen ? "block" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute left-[250px]   mt-9`}
                >
                    <ul className="py-2" aria-labelledby="dropdownButton">
                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                Edit
                            </a>
                        </li>

                        <li>
                            <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
                                Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="flex flex-col items-center pb-10">
                {/* <img className="w-24 h-24 mb-3 rounded-full shadow-lg" src="/docs/images/people/profile-picture-3.jpg" alt="Bonnie image" /> */}
                <h5 className="mb-1 text-xl font-medium text-gray-900">Bonnie Green</h5>
                <span className="text-sm text-gray-500">Visual Designer</span>
                <div className="flex mt-4 md:mt-6">
                    <a href="#" className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300">
                        Add friend
                    </a>
                    <a href="#" className="py-2 px-4 ms-2 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100">
                        Message
                    </a>
                </div>
            </div>
        </div>
    );
}

export default PCard;
