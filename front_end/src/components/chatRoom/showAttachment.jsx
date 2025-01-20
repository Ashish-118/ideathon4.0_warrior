import RenderFile from "../renderfile";
import { FaUser } from "react-icons/fa";
import useUser from "../../context/user";
function AttachmentTBox({ attachment }) {
    // const { sender, fileType, fileLink, createdAt, AttachTo } = attachment[0];


    let sender, fileType, fileLink, createdAt, AttachTo;

    if (attachment && Array.isArray(attachment) && attachment.length > 0 && attachment[0].AttachTo) {

        ({ sender, fileType, fileLink, createdAt, AttachTo } = attachment[0]);
    } else if (attachment && !Array.isArray(attachment)) {

        ({ sender, fileType, fileLink, createdAt, AttachTo } = attachment);
    } else {

        sender = fileType = fileLink = createdAt = AttachTo = null;
    }


    console.log("show attachment ", attachment);
    const { user } = useUser();


    function determineCloudinaryFileType(url) {
        if (!url) return "unknown";


        const extension = url.split('.').pop().toLowerCase();


        if (["jpg", "jpeg", "png", "gif", "webp"].includes(extension)) return "image/";
        if (["mp4", "avi", "mov", "mkv"].includes(extension)) return "video/";
        if (["pdf"].includes(extension)) return "application/pdf";

        return "unknown";
    }

    return (
        <div className={`flex flex-col  mb-5 mt-10 ${user?.data?.user?.username === sender
            ?
            "w-[200px] justify-self-end"
            :
            "w-[200px] justify-self-start "
            }`}>

            <div className="flex flex-row items-center mb-2">
                <div className="w-[30px] h-[30px] mr-2 rounded-full flex justify-center items-center bg-blue-400">
                    <h1 className="text-white   text-xl font-sans">{sender[0].toUpperCase()}</h1>
                </div>
                <h4 className="text-white font-semibold">{`~${sender}` || '...'}</h4>
            </div>


            {AttachTo && (
                <div className={` p-3 rounded-lg mb-3 text-gray-200 shadow-md max-w-[300px] ${user?.data?.user?.username === sender
                    ?
                    "bg-teal-700"
                    :
                    "bg-blue-800"
                    }`}>
                    <h5 className="font-semibold text-sm mb-1">Attachment to:</h5>
                    {AttachTo.startsWith("http") ? (
                        <RenderFile
                            fileLink={AttachTo}
                            fileType={determineCloudinaryFileType(AttachTo)}
                        />
                    ) : (
                        <p className="text-sm">{AttachTo}</p>
                    )}
                </div>
            )}


            <div className="grid grid-cols-2 gap-4 bg-gray-100 p-4 rounded-lg shadow-md">
                {fileLink && fileLink.length > 0 ? (
                    fileLink.map((link, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-md shadow p-3 flex flex-col items-center"
                        >
                            <RenderFile fileType={fileType[index]} fileLink={link} />
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500 text-sm">No attachments available</p>
                )}
            </div>


            <div className="text-gray-400 text-xs mt-2">
                {new Date(createdAt).toLocaleString() || "...."}
            </div>
        </div>
    );
}

export default AttachmentTBox;
