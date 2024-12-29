import React, { useEffect, useState } from "react";
import Fixed from "../components/FixedDoubtRoom.jsx";
import useUser from "../context/user";
import Signup_1 from "../components/signup/Signup1.jsx";
import Room from "../components/chatRoom/room.jsx";
import { PiXCircleFill } from "react-icons/pi";
import useSignup1 from "../context/signup1.jsx";
import Signup_2 from "../components/signup/Signup2.jsx";
import ImageSlider from "../components/imageSlider.jsx";
function home() {
    const { user } = useUser();
    const { Signup1 } = useSignup1();
    const [welcome, setwelcome] = useState("Welcome ,");
    const [doneLogin, setdoneLogin] = useState(false);
    const [isSignupOpen, setIsSignupOpen] = useState(false);
    const [isSignup2Open, setIsSignup2Open] = useState(false);

    const openSignup = () => setIsSignupOpen(true);
    const closeSignup = () => setIsSignupOpen(false);

    useEffect(() => {
        if (user && (user?.data?.user?.profileComplete)) {
            setdoneLogin(true)
            setwelcome(`Welcome back , ${user?.data?.user?.username}`)
            console.log(welcome)
        }
        if (user && !(user?.data?.user?.profileComplete)) {
            console.log("hello ashish")
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }
    }, [])     //  after login when we will navigate to home  , this useEffect will run 

    useEffect(() => {


        if (Signup1 && Signup1?.status === 201 && !user) {
            console.log("called this use effect")
            setIsSignupOpen(false);
            setIsSignup2Open(true);
        }


    }, [Signup1])

    return (
        <>

            <div>
                <div className={`home-content ${isSignupOpen || isSignup2Open ? "blurred" : ""}`}>
                    <div className="w-full h-[100px] mt-10 flex px-[100px] items-center">
                        {
                            doneLogin &&
                            <div className="w-[70px] h-[70px] flex   rounded-full bg-black text-center  text-white items-center justify-center text-3xl mr-3">
                                {user?.data?.user?.username[0]?.toUpperCase()}

                            </div>
                        }
                        <div>
                            <h1 className="text-Welcome text-4xl font-bold text-center font-serif">{welcome}</h1>
                        </div>
                    </div>
                    <div >
                        <ImageSlider onClickSignup={openSignup} />
                    </div>
                    {/* <p>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam temporibus consectetur veritatis, minus officiis iste neque a asperiores aliquid porro dicta quae, dolorum laboriosam libero nam quam optio est sunt velit accusamus expedita mollitia excepturi doloribus. Cum animi eius deserunt sunt, quod officia aperiam vero quia maiores fugit iure optio dolorem pariatur iusto quas suscipit provident nisi illo repudiandae corrupti nulla ex maxime. Blanditiis tempora natus unde autem nihil aliquid quo, hic facilis ratione fugit! Possimus fuga voluptatibus ipsa maiores sint impedit, nulla magni dolorem ratione nesciunt, dicta, dolores ex et repellendus eos id perspiciatis qui minus? Enim vero eaque quam esse ipsa reprehenderit rerum voluptates pariatur voluptatum architecto incidunt, dicta inventore laboriosam unde saepe corrupti deleniti nisi aperiam. Soluta a sit unde dignissimos earum eius voluptas exercitationem odio suscipit dolorem, veritatis nisi temporibus laborum cum. Eum aperiam commodi iste non velit molestiae autem illum! Necessitatibus optio dolores assumenda voluptates excepturi quidem nemo, neque, culpa cum esse, vitae alias dolor minima ad sint impedit voluptate similique iure animi nobis porro suscipit! Eos reprehenderit adipisci ex illo fugiat quaerat illum obcaecati quos repudiandae, explicabo soluta libero quod alias minima natus omnis quae commodi voluptas nostrum itaque sunt magnam. Iusto ullam cupiditate asperiores totam tempore dignissimos earum libero rem quo velit. Animi quis cum, ipsa, voluptatibus perferendis molestiae inventore facilis ducimus, dignissimos quidem tempora neque quasi adipisci reiciendis voluptas sed quas! Itaque consequuntur doloremque explicabo beatae voluptatem numquam blanditiis, dolor dignissimos harum dolore assumenda molestiae at odit possimus cumque exercitationem commodi tenetur corrupti, dolores omnis quas nam. Facere ea maxime explicabo, deserunt voluptas, sapiente earum blanditiis fugiat consectetur fugit mollitia eveniet, quod doloremque saepe sint temporibus. Eveniet cumque adipisci facere magnam nulla. Pariatur tempore eveniet officia voluptate dolorum, quas nemo ducimus asperiores quibusdam, in, explicabo reprehenderit praesentium repellat error facilis accusantium. Odio inventore accusamus vel perspiciatis soluta at sint dignissimos architecto placeat a nobis dolorum, praesentium optio quidem, non fugit maxime ex aliquid eaque harum accusantium voluptates. Magni at iusto voluptate dolore reiciendis ad, animi eveniet perspiciatis repellendus esse veniam nostrum numquam, veritatis ullam quo fugiat corrupti temporibus vero. Tempore necessitatibus saepe doloribus, est dolorem omnis vitae? Vitae ipsa dicta tenetur doloremque voluptatum ex delectus magni eius, maxime eos itaque blanditiis placeat reprehenderit? Doloribus voluptatem rem officiis voluptates asperiores assumenda architecto quas odio tempora veniam ducimus, similique nihil dignissimos molestiae ea at. Quas, doloribus sint! Perferendis, ullam! Soluta distinctio quasi nam accusantium quod aliquam fuga odio quia enim error, voluptate corporis eligendi eius blanditiis mollitia amet at pariatur cupiditate laborum quae inventore dignissimos. Asperiores in eaque expedita inventore, tenetur iste, suscipit necessitatibus earum velit saepe voluptas. Velit, necessitatibus, perspiciatis ducimus fugit hic nobis commodi odit itaque magnam architecto quas ratione similique ex eius amet officia eum distinctio corrupti quisquam nesciunt odio voluptatibus enim magni! Commodi exercitationem rem reprehenderit perspiciatis corrupti soluta eius esse aspernatur! Hic, consequatur atque omnis aliquid beatae dignissimos recusandae sequi minus, est ipsam reprehenderit reiciendis expedita repellendus! Cum quae placeat error hic iste nam aspernatur temporibus possimus ratione tenetur!
                    </p> */}

                </div>

                {isSignupOpen &&
                    <>
                        <Signup_1 closeSignup1={closeSignup} />
                    </>
                }
                {isSignup2Open &&
                    <>
                        <Signup_2 />
                    </>
                }

                <Fixed />
            </div>

        </>
    )
}


export default home