





import FilterPyq from '../components/filterPyq';
import Fixed from '../components/FixedDoubtRoom';
import { HiChevronRight } from "react-icons/hi";
import useUser from "../context/user";
import PCard from '../components/PYQcards';
import usePyq from "../context/getPyq";
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PyqUploader from '../components/pyqUploader';
import NotFound from '../components/NotFound';

function pyq() {
    const { user } = useUser();
    const { Pyq, setPyq } = usePyq();
    const [displayPyqUploader, setDisplayPyqUploader] = useState(false);

    useEffect(() => {
        const getPyq = async () => {
            if (!Pyq) {
                const response = await axios.post("http://localhost:8000/api/v1/users/pyqForHome");

                if (response.status === 200) {
                    setPyq(Array.from(response.data.data));
                }
            }
        };
        getPyq();
    }, [Pyq, setPyq]);

    return (
        <>
            <div className="relative flex flex-col min-h-screen">

                {displayPyqUploader && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white p-6 rounded-lg shadow-lg w-[90%] max-w-2xl">
                            <div className="flex justify-between items-center mb-4">
                                <h2 className="text-lg font-bold">Upload PYQ</h2>
                                <button
                                    className="text-gray-500 hover:text-gray-800"
                                    onClick={() => setDisplayPyqUploader(false)}
                                >
                                    ✖
                                </button>
                            </div>
                            <PyqUploader />
                        </div>
                    </div>
                )}

                <div className="flex-1 flex">
                    <div className="mt-[30px] w-[250px] sticky top-[100px] self-start">
                        <FilterPyq />
                    </div>

                    <div className="relative left-[50px] w-[1000px] mt-[50px]">
                        <div className="flex items-center sticky top-[75px] bg-white mb-6 z-40">
                            <h1 className="font-baloo text-menuItem text-xl px-2 py-2">
                                Previous Year Questions
                            </h1>
                            <HiChevronRight className="text-Custompurple w-[30px] h-[30px]" />
                            <button
                                onClick={() => setDisplayPyqUploader(true)}
                                className={`${user?.data?.user?.isAdmin ? "" : "hidden"
                                    } relative inline-flex ml-[490px] items-center ring-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-500 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300`}
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    Upload PYQ's
                                </span>
                            </button>
                        </div>

                        <div className="flex flex-wrap">
                            {Pyq && Pyq.length > 0 ? (
                                Pyq.map((pyq) => (
                                    <div className="mr-3 mb-6" key={pyq._id}>
                                        <PCard pyq={pyq} />
                                    </div>
                                ))
                            ) : (
                                <NotFound />
                            )}
                        </div>
                    </div>
                </div>

                <Fixed />
            </div>
        </>
    );
}

export default pyq;




// ----



// import FilterPyq from '../components/filterPyq';
// import Fixed from '../components/FixedDoubtRoom';
// import { HiChevronRight } from "react-icons/hi";
// import useUser from "../context/user";
// import PCard from '../components/PYQcards';
// import usePyq from "../context/getPyq";
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import PyqUploader from '../components/pyqUploader';
// import NotFound from '../components/NotFound';

// function pyq() {
//     const { user } = useUser();
//     const { Pyq, setPyq } = usePyq();
//     const [displayPyqUploader, setDisplayPyqUploader] = useState(false);

//     useEffect(() => {
//         const getPyq = async () => {
//             if (!Pyq) {
//                 const response = await axios.post("http://localhost:8000/api/v1/users/pyqForHome");

//                 if (response.status === 200) {
//                     setPyq(Array.from(response.data.data));
//                 }
//             }
//         };
//         getPyq();
//     }, [Pyq, setPyq]);

//     return (
//         <>
//             <div className="relative flex flex-col min-h-screen">
//                 {/* Modal for PyqUploader */}
//                 {displayPyqUploader && (
//                     <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
//                         <div className="bg-white p-6 rounded-lg shadow-xl w-[90%] max-w-3xl transform transition-all duration-300 scale-100 opacity-100">
//                             <div className="flex justify-between items-center mb-4">
//                                 <h2 className="text-lg font-semibold text-gray-800">Upload PYQ</h2>
//                                 <button
//                                     className="text-gray-500 hover:text-gray-800"
//                                     onClick={() => setDisplayPyqUploader(false)}
//                                 >
//                                     ✖
//                                 </button>
//                             </div>
//                             <PyqUploader />
//                         </div>
//                     </div>
//                 )}

//                 <div className="flex-1 flex">
//                     {/* Sidebar Filter */}
//                     <div className="mt-[30px] w-[250px] sticky top-[100px] self-start">
//                         <FilterPyq />
//                     </div>

//                     {/* Main Content Area */}
//                     <div className="relative left-[50px] w-full mt-[50px]">
//                         {/* Header Section */}
//                         <div className="flex items-center sticky top-[75px] bg-white shadow-md mb-6 z-40">
//                             <h1 className="font-baloo text-menuItem text-2xl px-4 py-2 text-gray-900">Previous Year Questions</h1>
//                             <HiChevronRight className="text-Custompurple w-[30px] h-[30px]" />
//                             {/* Button to Upload PYQ */}
//                             <button
//                                 onClick={() => setDisplayPyqUploader(true)}
//                                 className={`${user?.data?.user?.isAdmin ? "" : "hidden"} relative inline-flex ml-[auto] items-center justify-center p-2 mb-2 me-2 overflow-hidden text-sm font-medium text-white rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300`}
//                             >
//                                 <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0 text-sm font-semibold">Upload PYQs</span>
//                             </button>
//                         </div>

//                         {/* PYQ Cards Grid */}
//                         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
//                             {Pyq && Pyq.length > 0 ? (
//                                 Pyq.map((pyq) => (
//                                     <div className="flex justify-center" key={pyq._id}>
//                                         <PCard pyq={pyq} />
//                                     </div>
//                                 ))
//                             ) : (
//                                 <div className="col-span-full">
//                                     <NotFound />
//                                 </div>
//                             )}
//                         </div>
//                     </div>
//                 </div>

//                 <Fixed />
//             </div>
//         </>
//     );
// }

// export default pyq;
