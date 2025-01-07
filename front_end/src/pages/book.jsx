
import FilterPyq from '../components/filterPyq';
import Fixed from '../components/FixedDoubtRoom';
import { HiChevronRight } from "react-icons/hi";
import useUser from "../context/user";
import BCard from '../components/Bookcards';
import useBook from '../context/getBook';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookUploader from '../components/BookUploader'
import NotFound from '../components/NotFound';
function Book() {
    const { user } = useUser();
    const { Book, setBook } = useBook();
    const [DisplayBookUploader, setDisplayBookUploader] = useState(false);


    useEffect(() => {

        const getBook = async (e) => {

            if (!Book) {
                const response = await axios.post("http://localhost:8000/api/v1/users/BookForHome")
                console.log("i have been called")

                if (response.status === 200) {
                    console.log("i have been called 2")
                    setBook(Array.from(response.data.data))
                }
                console.log(response)
            }

        }
        getBook()
    }, [Book])


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
                                books
                            </h1>
                            <HiChevronRight className="text-Custompurple w-[30px] h-[30px]  " />
                            <button

                                onClick={() => {
                                    setDisplayBookUploader(!DisplayBookUploader);
                                }}

                                className={`${user?.data?.user?.isAdmin ? '' : 'hidden'} relative inline-flex ml-[490px] items-center ring-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-500 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 `}
                            >
                                <span className="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    Upload book's
                                </span>
                            </button>


                        </div>

                        <div className=' flex'>


                            <div className={`flex ${DisplayBookUploader ? 'w-4/6 ' : ''}  flex-wrap`}>
                                {
                                    Book && !(Book.length == 0)
                                        ?
                                        (Book.map((book) => (
                                            <div className='mr-3 mb-6'>
                                                <BCard key={book._id} book={book} />
                                            </div>

                                        )))
                                        :

                                        (<NotFound />)

                                }
                            </div>
                            <div className={`flex ${DisplayBookUploader ? ' ml-6 mt-10 w-2/6' : ''} `}>

                                {DisplayBookUploader && <BookUploader />}

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

export default Book;
