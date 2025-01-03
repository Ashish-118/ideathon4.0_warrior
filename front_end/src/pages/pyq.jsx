
import FilterPyq from '../components/filterPyq';
import Fixed from '../components/FixedDoubtRoom';
import { HiChevronRight } from "react-icons/hi";
import useUser from "../context/user";
import PCard from '../components/PYQcards';
import usePyq from "../context/getPyq"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PyqUploader from '../components/pyqUploader';
function pyq() {
    const { user } = useUser();
    const { Pyq } = usePyq();
    const [DisplayPyqUploader, setDisplayPyqUploader] = useState(false);
    // useEffect(() => {
    //     if (Pyq) {
    //         const response = await axios.post("http://localhost:8000/api/v1/users/pyq", {
    //             username: username.trim(),
    //             email: email.trim(),
    //             password: password.trim(),
    //         });
    //     }
    // }, [setPyq])


    return (
        <>
            <div className="relative flex flex-col min-h-screen">

                <div className="flex-1 flex">

                    <div className=" mt-[30px]  w-[250px] sticky top-[100px] self-start ">
                        <FilterPyq />
                    </div>


                    <div className="relative left-[50px] w-[1000px] mt-[50px] ">
                        <div
                            className="flex items-center sticky top-[75px] bg-white  z-40  ">
                            <h1 className="font-baloo  text-menuItem text-xl px-2 py-2 ">
                                Previous Year Questions
                            </h1>
                            <HiChevronRight className="text-Custompurple w-[30px] h-[30px]  " />
                            <button

                                onClick={() => {
                                    setDisplayPyqUploader(!DisplayPyqUploader);
                                }}

                                class="relative inline-flex ml-[490px] items-center ring-2 justify-center p-0.5 mb-2 me-2 overflow-hidden text-sm font-medium text-gray-500 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 "
                            >
                                <span class="relative px-5 py-2.5 transition-all ease-in duration-75 bg-white rounded-md group-hover:bg-opacity-0">
                                    Upload PYQ's
                                </span>
                            </button>


                        </div>

                        <div className=' flex'>


                            <div className={`flex ${DisplayPyqUploader ? 'w-4/6 ' : ''} flex-wrap`}>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sit exercitationem quis ipsum, doloribus architecto corporis nostrum saepe atque consequuntur natus voluptatibus minima porro, vel amet pariatur explicabo hic unde inventore! Autem similique iusto nisi inventore non dolore in illo dolor molestiae, quidem quibusdam cumque ex, aut adipisci! Sint officiis magni et explicabo eligendi error molestiae aperiam voluptates tenetur! Non optio quo ut illum quasi veritatis rem ea, doloribus, quis vero, veniam commodi tempore animi. Fuga, repudiandae. Distinctio dolores nobis sapiente saepe obcaecati facilis atque provident, dicta modi explicabo odio quia nihil ducimus nostrum voluptas totam consequatur incidunt quis quas veniam eum. Nemo, impedit. Aliquid similique dignissimos ullam, fuga ipsum non laboriosam perspiciatis voluptatem enim tenetur illum mollitia! Atque quos suscipit totam expedita consequuntur animi! Autem expedita ab omnis nam quod excepturi eligendi? Commodi similique non ex esse doloribus, architecto eum facilis praesentium eius asperiores vero deleniti impedit ullam! Voluptatum obcaecati cumque hic quaerat nulla dolores animi quod quidem reprehenderit, aperiam ex accusamus. Ad ex et optio dolores, voluptas voluptates odit tempore? Expedita iure itaque eum. Iusto magni soluta sit necessitatibus id quaerat distinctio reprehenderit adipisci ipsum eaque tenetur similique ipsam, incidunt omnis excepturi, perferendis velit totam eius repudiandae facere autem labore ratione molestiae. Magnam nemo nostrum amet laboriosam. Quas nam nemo debitis nostrum voluptas temporibus similique nihil aliquid ducimus suscipit necessitatibus, tempora sit perferendis saepe velit accusamus dolore explicabo sequi labore cupiditate excepturi quam, nulla voluptates corrupti! Cupiditate repudiandae dolorum ducimus! Eligendi sequi ut iure atque necessitatibus ratione. Porro quibusdam blanditiis laudantium qui ex fuga fugit nostrum aspernatur voluptatem nemo! Laboriosam porro iste eligendi, nemo eaque nam expedita nisi animi harum repellat hic dignissimos excepturi perspiciatis cumque assumenda iusto eius rem nobis? Veniam perspiciatis eos molestiae magnam officiis non pariatur ex suscipit eum, eius magni dignissimos, exercitationem aliquam quidem dolor inventore iure fugiat obcaecati enim? Error vitae ipsam, perspiciatis quis praesentium iusto officiis labore odit, quod, et maiores ratione nostrum fugit minus non excepturi rerum? Itaque, harum suscipit natus qui, iusto aperiam ratione temporibus placeat laborum nesciunt rerum veniam nam. Rem nostrum, dolorem laborum repellendus molestiae facilis, enim aperiam reprehenderit at assumenda atque qui quam libero veniam cupiditate odio sapiente excepturi laudantium quia, commodi quos vitae quaerat velit beatae. Odio ullam est porro, amet mollitia voluptatum in magnam ipsa molestiae distinctio, repudiandae reiciendis ab ea nam dicta, architecto explicabo? Quaerat quae temporibus ad porro dolorum aliquam! Distinctio quasi non hic.
                                {Pyq
                                    &&
                                    Pyq.map((pyq) => (
                                        <PCard key={pyq._id} pyq={pyq} />
                                    ))
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
