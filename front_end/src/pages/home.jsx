// import React, { useEffect, useState } from "react";
// import Fixed from "../components/FixedDoubtRoom.jsx";
// import useUser from "../context/user";
// import Signup_1 from "../components/signup/Signup1.jsx";
// import Room from "../components/chatRoom/room.jsx";
// import { PiXCircleFill } from "react-icons/pi";
// import useSignup1 from "../context/signup1.jsx";
// import Signup_2 from "../components/signup/Signup2.jsx";
// import ImageSlider from "../components/imageSlider.jsx";
// import axios from "axios";

// function home() {
//     const { user } = useUser();

//     const { Signup1 } = useSignup1();
//     const [welcome, setwelcome] = useState("Welcome ,");
//     const [doneLogin, setdoneLogin] = useState(false);
//     const [isSignupOpen, setIsSignupOpen] = useState(false);
//     const [isSignup2Open, setIsSignup2Open] = useState(false);

//     const openSignup = () => setIsSignupOpen(true);
//     const closeSignup = () => setIsSignupOpen(false);


//     useEffect(() => {
//         if (user && (user?.data?.user?.profileComplete)) {
//             setdoneLogin(true)
//             setwelcome(`Welcome back , ${user?.data?.user?.username}`)
//             console.log(welcome)
//         }
//         if (user && !(user?.data?.user?.profileComplete)) {
//             console.log("hello ashish")
//             setIsSignupOpen(false);
//             setIsSignup2Open(true);
//         }
//     }, [])     //  after login when we will navigate to home  , this useEffect will run 

//     useEffect(() => {


//         if (Signup1 && Signup1?.status === 201 && !user) {
//             console.log("called this use effect")
//             setIsSignupOpen(false);
//             setIsSignup2Open(true);
//         }


//     }, [Signup1])

//     return (
//         <>

//             <div>
//                 <div className={`home-content ${isSignupOpen || isSignup2Open ? "blurred" : ""}`}>
//                     <div className="w-full h-[100px] mt-10 flex px-[100px] items-center">
//                         {
//                             doneLogin &&
//                             <div className="w-[70px] h-[70px] flex   rounded-full bg-black text-center  text-white items-center justify-center text-3xl mr-3">
//                                 {user?.data?.user?.username[0]?.toUpperCase()}

//                             </div>
//                         }
//                         <div>
//                             <h1 className="text-Welcome text-4xl font-bold text-center font-serif">{welcome}</h1>
//                         </div>
//                     </div>
//                     <div >
//                         <ImageSlider onClickSignup={openSignup} />
//                     </div>


//                 </div>

//                 {isSignupOpen &&
//                     <>
//                         <Signup_1 closeSignup1={closeSignup} />
//                     </>
//                 }
//                 {isSignup2Open &&
//                     <>
//                         <Signup_2 />
//                     </>
//                 }

//                 <Fixed />
//             </div>

//         </>
//     )
// }


// export default home




import React, { useEffect, useState } from "react";
import Fixed from "../components/FixedDoubtRoom.jsx";
import useUser from "../context/user";
import Signup_1 from "../components/signup/Signup1.jsx";
import Room from "../components/chatRoom/room.jsx";
import { PiXCircleFill } from "react-icons/pi";
import useSignup1 from "../context/signup1.jsx";
import Signup_2 from "../components/signup/Signup2.jsx";
import ImageSlider from "../components/imageSlider.jsx";
import axios from "axios";

function Home() {
    const { user } = useUser();
    const { Signup1 } = useSignup1();
    const [welcome, setWelcome] = useState("Welcome ,");
    const [doneLogin, setDoneLogin] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSignup2Open, setIsSignup2Open] = useState(false);


    const [activeFAQ, setActiveFAQ] = useState(null);

    const toggleFAQ = (index) => {
        setActiveFAQ(activeFAQ === index ? null : index);
    };


    const openSignup = () => setIsSignupOpen(true);
    const closeSignup = () => setIsSignupOpen(false);

    useEffect(() => {
        if (user?.data?.user?.profileComplete) {
            setDoneLogin(true);
            setWelcome(`Welcome back, ${user?.data?.user?.username}`);
        }
        if (user && !user?.data?.user?.profileComplete) {
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }
    }, []);

    useEffect(() => {
        if (Signup1?.status === 201 && !user) {
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }
    }, [Signup1]);

    return (
        <div>

            <div className="hero-section bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center py-16">
                <h1 className="text-5xl font-bold mb-4">Empower Your Learning Journey</h1>
                <p className="text-xl mb-6">Get answers to your questions and connect with experts to enhance your knowledge.</p>
                <button
                    onClick={openSignup}
                    className="px-6 py-3 bg-white text-blue-500 rounded-full font-bold text-lg hover:bg-blue-100"
                >
                    Join Now
                </button>
            </div>


            <div className={`home-content ${isSignupOpen || isSignup2Open ? "blurred" : ""}`}>
                <div className="w-full h-[100px] mt-10 flex px-[100px] items-center">
                    {doneLogin && (
                        <div className="w-[70px] h-[70px] flex rounded-full bg-black text-center text-white items-center justify-center text-3xl mr-3">
                            {user?.data?.user?.username[0]?.toUpperCase()}
                        </div>
                    )}
                    <div>
                        <h1 className="text-Welcome text-4xl font-bold text-center font-serif">{welcome}</h1>
                    </div>
                </div>
                <div>
                    <ImageSlider onClickSignup={openSignup} />
                </div>
            </div>


            <div className="features-section bg-gray-100 py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Why Choose Us?</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-6">
                    <div className="feature-card bg-white shadow-lg p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold mb-4">Expert Answers</h3>
                        <p>Get high-quality answers from industry experts and educators.</p>
                    </div>
                    <div className="feature-card bg-white shadow-lg p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold mb-4">Interactive Community</h3>
                        <p>Engage with students and professionals to enhance your knowledge.</p>
                    </div>
                    <div className="feature-card bg-white shadow-lg p-6 rounded-lg text-center">
                        <h3 className="text-2xl font-semibold mb-4">Quick Access</h3>
                        <p>Access solutions to previous year questions and clear your doubts in no time.</p>
                    </div>
                </div>
            </div>


            <div className="faq-section bg-white py-12">
                <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
                <div className="faq-container px-6">
                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(0)}
                        >
                            <span>How do I ask a question?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 0 ? 'block' : 'hidden'}`}>
                            Click on the "Ask Doubt" button to start your query journey. Our dedicated doubt room for each college is available to assist you with specific queries.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(1)}
                        >
                            <span>Is the platform free to use?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 1 ? 'block' : 'hidden'}`}>
                            Yes, it’s completely free for students and educators. You can access previous year questions (PYQs) and study resources at no cost.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(2)}
                        >
                            <span>How can I access previous year questions?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 2 ? 'block' : 'hidden'}`}>
                            You can find previous year questions (PYQs) in the "PYQ Room" section. We provide solutions to each question for your ease of understanding.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(3)}
                        >
                            <span>What is the doubt room?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 3 ? 'block' : 'hidden'}`}>
                            The doubt room is a dedicated space where you can ask any question related to your subjects or course. Connect with experts and fellow students to get answers.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(4)}
                        >
                            <span>How do I join a doubt room for my college?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 4 ? 'block' : 'hidden'}`}>
                            Select your college from the list, and you will be added to a dedicated doubt room. This room allows you to interact with your peers and ask questions related to your course.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(5)}
                        >
                            <span>Do you provide study resources and books?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 5 ? 'block' : 'hidden'}`}>
                            Yes, we provide a wide range of study materials and books. You can find them in the "Resources" section of your dashboard.
                        </div>
                    </div>

                    <div className="faq-item mb-4">
                        <div
                            className="faq-question font-semibold text-xl cursor-pointer flex justify-between items-center"
                            onClick={() => toggleFAQ(6)}
                        >
                            <span>Is there a dedicated doubt room for every college?</span>
                            <PiXCircleFill className="w-5 h-5" />
                        </div>
                        <div className={`faq-answer mt-2 text-gray-600 ${activeFAQ === 6 ? 'block' : 'hidden'}`}>
                            Yes, each college has its own doubt room where you can ask questions relevant to your courses and interact with your college mates.
                        </div>
                    </div>

                </div>
            </div>





            {isSignupOpen && <Signup_1 closeSignup1={closeSignup} />}
            {isSignup2Open && <Signup_2 />}

            <Fixed />
        </div>
    );
}

export default Home;
