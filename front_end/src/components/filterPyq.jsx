import React, { useState, useEffect } from "react";
import collegeList from "../assets/collegeData.js";
import { HiChevronDown } from "react-icons/hi";
import axios from "axios";
import usePyq from "../context/getPyq";

function FilterPyq() {
    const [collegeName, setCollegeName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [filteredCollegeList, setFilteredCollegeList] = useState(collegeList); // Dynamic filtered list
    const [searchTerm, setSearchTerm] = useState(""); // Input for filtering dropdown
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
            });
            if (filteredPyqResponse.status === 200) {
                setPyq(Array.from(filteredPyqResponse.data.data));
            }
        } catch (error) {
            console.error("Error while filtering PYQs:", error);
        }
    };

    useEffect(() => {
        if (collegeName || year || courseCode) {
            filterPyq();
        }
    }, [collegeName, year, courseCode]);


    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    const handleCollegeSelect = (college) => {
        setCollegeName(college);
        setIsDropdownOpen(false);
    };

    // Handle Year Button Click
    const handleYearClick = (yearValue) => {
        setYear(yearValue);
        setDisabledButtons({ [yearValue]: true });
    };

    // Filter Colleges Based on Search Term
    const handleSearchChange = (e) => {
        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filteredList = collegeList.filter((college) =>
            college.toLowerCase().includes(searchValue)
        );
        setFilteredCollegeList(filteredList);
    };

    return (
        <div className="w-[220px] ml-5 border h-[550px] text-center rounded-[10px] bg-white items-center sticky">
            <h1 className="text-menuItem text-3xl font-mono mt-[30px] underline underline-offset-4">Filters</h1>

            {/* Year Filter */}
            <h2 className="text-menuItem font-baloo text-xl font-bold mt-[30px] mb-[10px]">Year of Study:</h2>
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
                        className={`mt-2 rounded-[7px] text-center w-[150px] h-[40px] ${disabledButtons[yearObj.value]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-Custompurple hover:bg-purple-700"
                            } text-white font-baloo text-xl flex items-center justify-center`}
                        disabled={disabledButtons[yearObj.value]}
                    >
                        {yearObj.label}
                        <HiChevronDown className="ml-6" />
                    </button>
                ))}
            </div>

            {/* Course Code Input */}
            <div className="flex justify-center items-center mt-[50px] mb-[20px]">
                <input
                    value={courseCode}
                    onChange={(e) => setCourseCode(e.target.value)}
                    type="text"
                    placeholder="Course Code"
                    className="rounded-[7px] w-[150px] ring-4 ring-purple-700 h-[40px] bg-bodyBg text-center text-gray-600 font-baloo text-xl"
                />
            </div>

            {/* College Dropdown */}
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
                    <div
                        id="dropdown"
                        className="absolute bottom-full mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                    >

                        <div className="p-2">
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="Search Colleges"
                                className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                            />
                        </div>


                        <div className="py-1 overflow-y-scroll h-[200px]">
                            {filteredCollegeList.length > 0 ? (
                                filteredCollegeList.map((college, index) => (
                                    <button
                                        key={index}
                                        value={college}
                                        onClick={(e) => handleCollegeSelect(e.target.value)}
                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {college}
                                    </button>
                                ))
                            ) : (
                                <div className="text-center text-sm text-gray-500 py-2">
                                    No colleges found
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default FilterPyq;



// import React, { useState, useEffect } from "react";
// import collegeList from "../assets/collegeData.js";
// import { HiChevronDown } from "react-icons/hi";
// import axios from "axios";
// import usePyq from "../context/getPyq";

// function FilterPyq() {
//     const [collegeName, setCollegeName] = useState("");
//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//     const [filteredCollegeList, setFilteredCollegeList] = useState(collegeList);
//     const [searchTerm, setSearchTerm] = useState("");
//     const [year, setYear] = useState("");
//     const [courseCode, setCourseCode] = useState("");
//     const [disabledButtons, setDisabledButtons] = useState({});

//     const { Pyq, setPyq } = usePyq();

//     const filterPyq = async () => {
//         try {
//             const filteredPyqResponse = await axios.post("http://localhost:8000/api/v1/users/pyq/filter", {
//                 collegeName: collegeName || null,
//                 forYear: year || null,
//                 courseCode: courseCode || null,
//             });
//             if (filteredPyqResponse.status === 200) {
//                 setPyq(Array.from(filteredPyqResponse.data.data));
//             }
//         } catch (error) {
//             console.error("Error while filtering PYQs:", error);
//         }
//     };

//     useEffect(() => {
//         if (collegeName || year || courseCode) {
//             filterPyq();
//         }
//     }, [collegeName, year, courseCode]);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     const handleCollegeSelect = (college) => {
//         setCollegeName(college);
//         setIsDropdownOpen(false);
//     };

//     const handleYearClick = (yearValue) => {
//         setYear(yearValue);
//         setDisabledButtons({ [yearValue]: true });
//     };

//     const handleSearchChange = (e) => {
//         const searchValue = e.target.value.toLowerCase();
//         setSearchTerm(searchValue);
//         const filteredList = collegeList.filter((college) =>
//             college.toLowerCase().includes(searchValue)
//         );
//         setFilteredCollegeList(filteredList);
//     };

//     return (
//         <div className="w-[280px] border h-auto text-center rounded-xl bg-white shadow-lg sticky top-10 p-6">
//             <h1 className="text-2xl font-bold text-gray-800 underline underline-offset-4 mb-6">Filters</h1>

//             {/* Year Filter */}
//             <div className="mb-8">
//                 <h2 className="text-lg font-semibold text-gray-700 mb-3">Year of Study:</h2>
//                 <div className="flex flex-col items-center gap-3">
//                     {[
//                         { label: "1st year", value: "1" },
//                         { label: "2nd year", value: "2" },
//                         { label: "3rd year", value: "3" },
//                         { label: "4th year", value: "4" },
//                         { label: "5th year", value: "5" },
//                     ].map((yearObj, index) => (
//                         <button
//                             key={index}
//                             value={yearObj.value}
//                             onClick={(e) => handleYearClick(e.target.value)}
//                             className={`w-[200px] py-2 rounded-lg text-sm font-medium ${disabledButtons[yearObj.value]
//                                 ? "bg-gray-400 cursor-not-allowed text-white"
//                                 : "bg-purple-500 hover:bg-purple-600 text-white"
//                                 }`}
//                             disabled={disabledButtons[yearObj.value]}
//                         >
//                             {yearObj.label}
//                         </button>
//                     ))}
//                 </div>
//             </div>

//             {/* Course Code Input */}
//             <div className="mb-8">
//                 <input
//                     value={courseCode}
//                     onChange={(e) => setCourseCode(e.target.value)}
//                     type="text"
//                     placeholder="Course Code"
//                     className="w-[200px] p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                 />
//             </div>

//             {/* College Dropdown */}
//             <div className="relative">
//                 <button
//                     id="dropdownDefaultButton"
//                     onClick={toggleDropdown}
//                     className="w-[200px] flex justify-between items-center py-2 px-3 bg-indigo-500 text-white font-medium text-sm rounded-lg hover:bg-indigo-600"
//                 >
//                     {collegeName || "Select College"}
//                     <HiChevronDown className="ml-2" />
//                 </button>

//                 {isDropdownOpen && (
//                     <div
//                         id="dropdown"
//                         className="absolute mt-2 z-10 bg-white border border-gray-300 rounded-lg shadow-lg w-full max-h-[300px] overflow-y-auto"
//                     >
//                         <div className="p-2">
//                             <input
//                                 type="text"
//                                 value={searchTerm}
//                                 onChange={handleSearchChange}
//                                 placeholder="Search Colleges"
//                                 className="w-full p-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
//                             />
//                         </div>

//                         <div className="py-1">
//                             {filteredCollegeList.length > 0 ? (
//                                 filteredCollegeList.map((college, index) => (
//                                     <button
//                                         key={index}
//                                         value={college}
//                                         onClick={(e) => handleCollegeSelect(e.target.value)}
//                                         className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
//                                     >
//                                         {college}
//                                     </button>
//                                 ))
//                             ) : (
//                                 <div className="text-center text-sm text-gray-500 py-2">
//                                     No colleges found
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default FilterPyq;
