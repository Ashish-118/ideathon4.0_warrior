import React from "react";
import { IoEye } from "react-icons/io5";

const RenderFile = ({ fileType, fileLink, color }) => {
    // const { fileType, fileLink } = fileChat;


    if (fileType?.startsWith("image/")) {
        return (
            <div>
                <img src={fileLink} className="max-w-full h-auto mb-1" />
                <a
                    className={`text-${color} `}
                    href={fileLink} target="_blank" rel="noopener noreferrer">
                    <IoEye />
                </a>
            </div>
        );
    } else if (fileType === "application/pdf") {
        return (
            <div>
                <embed
                    className="max-w-full h-auto mb-1"
                    src={fileLink} width="100%" height="100px" />
                <a
                    className={`text-${color} `}
                    href={fileLink} target="_blank" rel="noopener noreferrer"> <IoEye /></a>
            </div>
        );
    } else if (fileType?.startsWith("video/")) {
        return (
            <div>
                <video controls src={fileLink} className="max-w-full h-auto mb-1"></video>
                <a
                    className={`text-${color} `}
                    href={fileLink} target="_blank" rel="noopener noreferrer"> <IoEye /></a>
            </div>
        );
    } else {
        return <p>Unsupported file type </p>;
    }

};

export default RenderFile