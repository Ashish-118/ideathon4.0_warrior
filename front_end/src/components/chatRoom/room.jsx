import React from "react";
import { HiOutlineArrowCircleRight } from "react-icons/hi";
import { HiPaperClip } from "react-icons/hi2";
import { HiMiniRocketLaunch } from "react-icons/hi2";

function Room() {


    return (
        <div >
            <div className="w-[350px] h-[700px] bg-gray-900 rounded-lg  border-2 border-menuItem  shadow-2xl shadow-menuItem">
                <div className="flex flex-col h-[45px] w-[350px] justify-center">
                    <h1 className="text-white font-baloo text-center text-2xl mt-3">Doubt room</h1>
                    <hr className="mt-1" />
                </div>
                <div className="Border text-gray-400 flex ">
                    <h3 className="">Online</h3>
                </div>
                <div className="w-[350px] h-[475px]  ">

                </div>
                <div className="flex ">
                    <HiPaperClip className="text-white rounded-l  items-center bg-menuItem w-[30px] h-[50px] hover:text-gray-200" />
                    <input type="text" placeholder="Ask Question  " className="w-[280px] h-[50px] rounded-r text-center outline-none " />
                    <HiMiniRocketLaunch className="text-white w-[30px] h-[50px] hover:text-red-400" />

                </div>
            </div>
        </div>
    )
}

export default Room;
