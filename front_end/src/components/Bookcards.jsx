// import React, { useState } from "react";
// import ashish from "../assets/logo/Ashish (1).jpeg";
// import RenderFile from "./renderfile"

// function BCard({ book }) {
//     const pdfExtensions = ['.pdf'];



//     const getFileType = (url) => {
//         if (!url) {
//             return false
//         }
//         const lowerCaseUrl = url.toLowerCase();

//         if (pdfExtensions.some(ext => lowerCaseUrl.endsWith(ext))) {
//             return "application/pdf";
//         }



//     };
//     const paperPdfFormat = getFileType(book.bookPdf)


//     const [isDropdownOpen, setIsDropdownOpen] = useState(false);

//     const toggleDropdown = () => {
//         setIsDropdownOpen(!isDropdownOpen);
//     };

//     return (
//         <div className="w-[300px] flex flex-col max-w-sm bg-white border border-gray-200 rounded-lg  rounded-t-2xl shadow relative">
//             <div className="flex items-center">
//                 <img
//                     src={book.admin[0].avatar}
//                     className="w-[35px] h-[35px] rounded-full"
//                     alt="profile"
//                 />
//                 <h3 className=" w-[150px] text-gray-400  ml-[110px] text-wrap flex justify-end">~{book.admin[0].username}</h3>
//             </div>


//             <div className="flex flex-col items-center pb-10 mt-5">

//                 {
//                     book.bookPdf &&
//                     <a href={book.bookPdf} target="_blank" className=" text-blue-700 hover:text-blue-800">
//                         {
//                             <RenderFile fileType={paperPdfFormat} fileLink={book.bookPdf} color="bg-gray-400" />
//                         }
//                     </a>
//                 }

//             </div>


//             <hr />

//             <div className="flex flex-col w-full h-fit items-center justify-center mt-3">
//                 <h5 className="mb-1 text-xl  text-gray-900 font-baloo font-bold text-center text-wrap">{book.title}</h5>
//                 <div className="flex text-gray-400">


//                     <span >#author : {book.author}</span>

//                 </div>

//             </div>

//             <div className="flex justify-end px-4 pt-4">
//                 <button
//                     id="dropdownButton"
//                     onClick={toggleDropdown}
//                     className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
//                     type="button"
//                 >
//                     <span className="sr-only">Open dropdown</span>
//                     <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 3">
//                         <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
//                     </svg>
//                 </button>


//                 <div
//                     id="dropdown"
//                     className={`z-10 ${isDropdownOpen ? "block" : "hidden"} text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute left-[250px]   mt-9`}
//                 >
//                     <ul className="py-2" aria-labelledby="dropdownButton">
//                         <li>
//                             <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
//                                 Edit
//                             </a>
//                         </li>

//                         <li>
//                             <a href="#" className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100">
//                                 Delete
//                             </a>
//                         </li>
//                     </ul>
//                 </div>
//             </div>
//         </div >
//     );
// }

// export default BCard;



// -->  beauty

import React, { useState } from "react";
import RenderFile from "./renderfile";

function BCard({ book }) {
    const pdfExtensions = [".pdf"];

    const getFileType = (url) => {
        if (!url) return false;
        const lowerCaseUrl = url.toLowerCase();
        if (pdfExtensions.some((ext) => lowerCaseUrl.endsWith(ext))) return "application/pdf";
    };

    const paperPdfFormat = getFileType(book.bookPdf);
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen);

    return (
        <div className="w-[320px] flex flex-col bg-gray-50 border border-gray-300 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center p-4 border-b border-gray-200">
                <img
                    src={book.admin[0].avatar}
                    className="w-[40px] h-[40px] rounded-full"
                    alt="profile"
                />
                <h3 className="ml-auto text-gray-500 text-sm italic">~{book.admin[0].username}</h3>
            </div>

            <div className="p-4 flex flex-col items-center">
                {book.bookPdf && (
                    <a
                        href={book.bookPdf}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-700 hover:text-blue-900"
                    >
                        <RenderFile fileType={paperPdfFormat} fileLink={book.bookPdf} color="bg-gray-400" />
                    </a>
                )}
            </div>

            <div className="p-4 border-t border-gray-200">
                <h5 className="mb-2 text-lg font-bold text-center text-gray-800">{book.title}</h5>
                <div className="flex justify-center text-gray-500 text-sm">
                    <span>#author: {book.author}</span>
                </div>
            </div>

            <div className="flex justify-end p-4">
                <button
                    id="dropdownButton"
                    onClick={toggleDropdown}
                    className="inline-block text-gray-500 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm p-1.5"
                    type="button"
                >
                    <span className="sr-only">Open dropdown</span>
                    <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 16 3"
                    >
                        <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                    </svg>
                </button>

                {isDropdownOpen && (
                    <div
                        id="dropdown"
                        className="z-10 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow w-44 absolute left-[250px] mt-9"
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
                )}
            </div>
        </div>
    );
}

export default BCard;

