import Dropdown from "./dropDownReply";



function ReplyBox({ message, sender }) {
    return (

        <div className="flex flex-row ml-[170px] mb-2 justify-end">


            <div
                className={` w-fit max-w-[200px]   break-words text-white  mb-2 text-center p-2  shadow-md  bg-cyan-800 rounded-lg py-0 px-0 `}
            >

                <div className="flex flex-row   w-full bg-cyan-950 rounded-t-lg text-gray-400 ">
                    <div className=" mr-auto ml-2 ">
                        {sender}
                    </div>
                    <div>
                        <Dropdown color={'bg-cyan-700'} />
                    </div>

                </div>
                <div>
                    <p className="text-center p-3">
                        {message}
                    </p>
                </div>

            </div>
        </div>
    )
}

export default ReplyBox;