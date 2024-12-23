import React from "react";
import { HiOutlineArrowLeftCircle } from "react-icons/hi2";

function Fixed() {
    return (
        <>
            {/* hover:text-purple-700 */}
            <div className="fixed top-[350px] right-[50px] w-[50px] h-[50px] flex items-center justify-center ">
                <HiOutlineArrowLeftCircle className="text-Custompurple w-[50px] h-[50px] hover:text-purple-700" />
            </div>
            <div className=" w-[100px] h-[100px] flex bg-Custompurple rounded-full items-center sticky bottom-2 left-[650px] hover:bg-purple-700">
                <h1 className=" text-white font-baloo text-2xl text-center"> Ask Doubt</h1>
            </div>

        </>
    )

}


export default Fixed