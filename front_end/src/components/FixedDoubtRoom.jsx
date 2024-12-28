import React, { useState } from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";
import Room from "./chatRoom/room.jsx";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { CiCircleChevLeft } from "react-icons/ci";
function Fixed() {
    const [AskState, setAskState] = useState(false);
    function toggleAskState() {
        setAskState((prevState) => !prevState);

    }

    return (
        <>
            {/* hover:text-purple-700 */}
            <div className="fixed top-[350px] right-[5px] w-[50px] h-[50px] flex items-center justify-center " >
                <CiCircleChevLeft className="text-Custompurple w-[50px] h-[50px] hover:text-purple-700 " onClick={toggleAskState} />

            </div>
            <div className=" w-[100px] h-[100px] flex bg-Custompurple rounded-full items-center sticky bottom-2 left-[650px] hover:bg-purple-700">
                <h1 className=" text-white font-baloo text-2xl text-center"> Ask Doubt</h1>
            </div>

            <div
                className={`fixed top-[100px] right-0   shadow-lg transition-transform duration-300 ease-in-out ${AskState ? "translate-x-0" : "translate-x-full"
                    }`}
                style={{ zIndex: 1000 }}
            >

                <div
                    className="absolute top-2 left-2 cursor-pointer"
                    onClick={toggleAskState}
                >
                    <HiOutlineArrowCircleRight className="text-white w-[30px] h-[30px] hover:text-red-400" />
                </div>
                <Room />
            </div>
        </>
    )

}


export default Fixed