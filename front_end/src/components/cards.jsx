import React from "react";
import ashish from "../assets/logo/Ashish (1).jpeg";
function Card({ forYear, CourseCode, paperYear, title, data }) {
    return (
        <div className=" w-[250px] h-[350px] rounded-xl shadow-2xl bg-white">
            <div>
                <h3 className="">{data?.user?.username}</h3>
                <img className="w-[50px] rounded-full " src={data?.user?.avatar || ashish} alt="" />

            </div>


        </div>
    )
}

export default Card