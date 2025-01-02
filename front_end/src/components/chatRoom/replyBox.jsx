import Dropdown from "./dropDownReply";
import RenderFile from "../renderfile";


function ReplyBox({ message, sender, fileLink, fileType, timestamp }) {
    return (
        <div className="flex flex-col justify-self-end mb-5 ">
            <div className="flex flex-col ml-[170px]    ">


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
                        <div className="text-center p-3">
                            {
                                message
                                    ? message

                                    : <RenderFile fileType={fileType} fileLink={fileLink} />
                            }
                        </div>

                    </div>

                </div>

            </div>
            <div className=" text-gray-400 w-fit ml-[170px] ">
                <h4 className="text-xs"> {timestamp || 'hello'}</h4>

            </div>
        </div>

    )
}

export default ReplyBox;