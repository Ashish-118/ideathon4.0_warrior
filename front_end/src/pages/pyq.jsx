
import FilterPyq from '../components/filterPyq';
import Fixed from '../components/FixedDoubtRoom';
import { HiChevronRight } from "react-icons/hi";
import useUser from "../context/user";
import PCard from '../components/PYQcards';
import usePyq from "../context/getPyq"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PyqUploader from '../components/pyqUploader';
import NotFound from '../components/NotFound';
function pyq() {
    const { user } = useUser();
    const { Pyq, setPyq } = usePyq();
    const [DisplayPyqUploader, setDisplayPyqUploader] = useState(false);


    useEffect(() => {

        const getPyq = async (e) => {

            if (!Pyq) {
                const response = await axios.post("http://localhost:8000/api/v1/users/pyqForHome")
                console.log("i have been called")

                if (response.status === 200) {
                    console.log("i have been called 2")
                    setPyq(Array.from(response.data.data))
                }
                console.log(response)
            }

        }
        getPyq()
    }, [Pyq])


    return (
        <>
            <div className="relative flex flex-col min-h-screen">

                <div className="flex-1 flex">

                    <div className=" mt-[30px]  w-[250px] sticky top-[100px] self-start ">
                        <FilterPyq />
                    </div>


                    <div className="relative left-[50px] w-[1000px] mt-[50px] ">
                        <div
                            className="flex items-center sticky top-[75px] bg-white mb-6  z-40  ">
                            <h1 className="font-baloo  text-menuItem text-xl px-2 py-2 ">
                                Previous Year Questions
                            </h1>
                            <HiChevronRight className="text-Custompurple w-[30px] h-[30px]  " />
                            <button

                                onClick={() => {
                                    setDisplayPyqUploader(!DisplayPyqUploader);
                                }}

                                className={`${user?.data?.user?.isAdmin ? '' : 'hidden'} relative inline-flex ml-[490px] items-center ring-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-500 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 `}
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    Upload PYQ's
                                </span>
                            </button>


                        </div>

                        <div className=' flex'>


                            <div className={`flex ${DisplayPyqUploader ? 'w-4/6 ' : ''}  flex-wrap`}>
                                {
                                    Pyq && !(Pyq.length == 0)
                                        ?
                                        (Pyq.map((pyq) => (
                                            <div className='mr-3 mb-6'>
                                                <PCard key={pyq._id} pyq={pyq} />
                                            </div>

                                        )))
                                        :

                                        (<NotFound />)

                                }
                            </div>
                            <div className={`flex ${DisplayPyqUploader ? ' ml-6 mt-10 w-2/6' : ''} `}>

                                {DisplayPyqUploader && <PyqUploader />}
                            </div>

                        </div>
                    </div>
                </div>


                <Fixed />
                {/* {user?.statusCode === 200 && user?.success && <Fixed />} */}
            </div>
        </>
    );
}

export default pyq;
