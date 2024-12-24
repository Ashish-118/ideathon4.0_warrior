import React from 'react';
import FilterPyq from '../components/filterPyq';
import Fixed from '../components/FixedDoubtRoom';
import { HiChevronRight } from "react-icons/hi";
import useUser from "../context/user";
import Card from '../components/cards.jsx';

function pyq() {
    const { user } = useUser();
    return (
        <>
            <div className="relative flex flex-col min-h-screen">

                <div className="flex-1 flex">

                    <div className=" mt-[30px]  w-[250px] sticky top-[100px] self-start ">
                        <FilterPyq />
                    </div>


                    <div className="relative left-[50px] w-[1000px] mt-[50px] ">
                        <div
                            className="flex items-center sticky top-[75px] bg-bodyBg z-40  ">
                            <h1 className="font-baloo  text-menuItem text-xl px-2 py-2 ">
                                Previous Year Questions
                            </h1>
                            <HiChevronRight className="text-Custompurple w-[30px] h-[30px]  " />
                        </div>
                        <div className=''>

                            <Card />
                        </div>
                    </div>
                </div>


                {/* <Fixed /> */}
                {user?.statusCode === 200 && user?.success && <Fixed />}
            </div>
        </>
    );
}

export default pyq;
