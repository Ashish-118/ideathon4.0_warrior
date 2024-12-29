import Dropdown from "./dropDown";



function MessageTBox({ message, sender }) {
    return (

        <div className="flex flex-row mb-[10px]">
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
                    <div>
                        <Dropdown color={'bg-indigo-700'} />
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

export default MessageTBox;