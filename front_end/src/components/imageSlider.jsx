import slide1Image from '../assets/logo/card1.jpg';
import slide2Image from '../assets/logo/div2.jpg';
import slide3Image from "../assets/logo/booksdiv.jpg";

import Slider from "react-slick";
import React, { useState, useEffect } from 'react';
import useUser from "../context/user";

export default function ImageSlider({ onClickSignup }) {

    const [renderSignup, setrenderSignup] = useState(true)
    const { user } = useUser();
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 5000, // Reduced autoplay speed to a reasonable value
        arrows: true,
        appendDots: (dots) => (
            <div style={{ bottom: "10px" }} className="absolute w-full">
                <ul className="flex justify-center space-x-2">{dots}</ul>
            </div>
        ),
        customPaging: () => (
            <div className="w-2 h-2 bg-white rounded-full hover:bg-gray-400 transition duration-300"></div>
        ),
    };

    useEffect(() => {
        if (user?.statusCode === 200) {
            setrenderSignup(false)
        }
    }, [])
    return (
        <div className="relative w-[1300px] mx-auto">
            <Slider {...settings}>

                {/* Slide 1 */}
                <div className="relative flex items-center justify-center h-[350px] bg-blue-500 text-white ">
                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 ">
                        {/* Left Section: Text and Buttons */}
                        <div className="flex flex-col justify-center space-y-4">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                Empowering College Students
                            </h2>
                            <p className="text-lg">
                                Our platform provides previous year questions (PYQ), essential books, and a dedicated doubt room to help students excel in their academic journey. Start exploring and achieve your dreams!
                            </p>
                            <div className="flex space-x-4">
                                <button className="bg-white text-blue-500 hover:bg-gray-100 font-bold py-2 px-4 rounded shadow">
                                    Learn More
                                </button>
                                {
                                    renderSignup
                                    &&
                                    <button
                                        onClick={onClickSignup}
                                        className="bg-blue-700 text-white hover:bg-blue-600 font-bold py-2 px-4 rounded shadow">
                                        Sign Up
                                    </button>
                                }
                            </div>
                        </div>

                        {/* Right Section: Image */}
                        <div className="flex justify-center items-center">
                            <img
                                src={slide1Image}
                                alt="Helping Students"
                                className="w-[400px] h-[400px] shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>

                {/* Slide 2 */}
                <div className="relative flex items-center justify-center h-[350px] bg-indigo-600 text-white ">
                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 ">
                        {/* Left Section: Text and Button */}
                        <div className="flex flex-col justify-center space-y-4">
                            <h2 className="text-2xl md:text-4xl font-bold">
                                Master PYQs
                            </h2>
                            <p className="text-lg">
                                Dive into a collection of previous year questions (PYQs) designed to enhance your preparation and improve your problem-solving skills. Practice, learn, and excel!
                            </p>
                            <div className="flex space-x-4">
                                <button className="bg-indigo-900 text-white hover:bg-indigo-800 font-bold py-2 px-4 rounded shadow">
                                    Explore Now
                                </button>
                            </div>
                        </div>

                        {/* Right Section: Image */}
                        <div className="flex justify-center items-center">
                            <img
                                src={slide2Image}
                                alt="Mastering PYQs"
                                className="w-[400px] h-[400px] shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>


                <div className="relative flex items-center justify-center h-[350px] bg-teal-600 text-white ">
                    <div className="w-full max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 px-4 ">

                        <div className="flex flex-col justify-center items-center space-y-4 text-center">
                            <h2 className="text-2xl md:text-4xl font-bold">
                                Discover Essential Books
                            </h2>
                            <p className="text-lg">
                                Gain access to a wide range of books that will aid in your studies, giving you all the resources needed to succeed in your exams.
                            </p>
                            <div className="flex space-x-4 justify-center">
                                <button className="bg-teal-900 text-white hover:bg-teal-800 font-bold py-2 px-4 rounded shadow">
                                    Explore Now
                                </button>
                            </div>
                        </div>


                        <div className="flex justify-center items-center">
                            <img
                                src={slide3Image}
                                alt="Books and Study Resources"
                                className="w-[400px] h-[200px] mt-[70px] rounded-lg shadow-lg object-cover"
                            />
                        </div>
                    </div>
                </div>

            </Slider>
        </div>
    );
}
