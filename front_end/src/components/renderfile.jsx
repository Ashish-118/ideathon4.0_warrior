
import React from "react";
const RenderFile = ({ fileType, fileLink }) => {
    // const { fileType, fileLink } = fileChat;


    if (fileType.startsWith("image/")) {
        return (
            <div>
                <img src={fileLink} className="max-w-full h-auto" />
                <a href={fileLink} target="_blank" rel="noopener noreferrer">View Full Image</a>
            </div>
        );
    } else if (fileType === "application/pdf") {
        return (
            <div>
                <embed src={fileLink} width="100%" height="100px" />
                <a href={fileLink} target="_blank" rel="noopener noreferrer">Download PDF</a>
            </div>
        );
    } else if (fileType.startsWith("video/")) {
        return (
            <div>
                <video controls src={fileLink} className="max-w-full h-auto"></video>
                <a href={fileLink} target="_blank" rel="noopener noreferrer">Watch Full Video</a>
            </div>
        );
    } else {
        return <p>Unsupported file type </p>;
    }

};

export default RenderFile