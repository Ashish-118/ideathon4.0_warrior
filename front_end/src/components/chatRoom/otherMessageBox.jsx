import Dropdown from "./dropDown";
import RenderFile from "../renderfile";


function MessageTBox({ message, sender, fileLink, fileType, timestamp, chatId }) {
    return (
        <div className="flex flex-col justify-self-start mb-5 ">
            <div className="flex flex-row ">
                <div className="w-[30px] h-[30px] mr-2 rounded-full flex  justify-center items-center bg-indigo-400 ">
                    <h1 className="text-white   text-xl font-sans">{sender[0].toUpperCase()}</h1>
                </div>

                <div
                    className={` w-fit max-w-[200px]   break-words text-white  mb-2 text-center p-2  shadow-md  bg-indigo-700 rounded-lg py-0 px-0 `}
                >

                    <div className="flex flex-row   w-full bg-indigo-900 rounded-t-lg text-gray-400 ">
                        <div className=" mr-auto ml-2 ">
                            {sender}
                        </div>
                        <div >
                            <Dropdown chatId={chatId} color={'bg-indigo-700'} />
                        </div>

                    </div>
                    <div>
                        <div className="text-center p-3">
                            {
                                message
                                    ?
                                    message

                                    :
                                    < RenderFile fileType={fileType} fileLink={fileLink} />
                            }
                        </div>

                    </div>

                </div>

            </div>
            <div className=" text-gray-400 w-fit ml-[40px]">
                <h4 className="text-xs"> {timestamp || '....'}</h4>

            </div>
        </div>
    )
}

export default MessageTBox;