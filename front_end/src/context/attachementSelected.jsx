import { createContext, useContext, useState } from "react";


export const fileAttachedContext = createContext(null);

export const FileProvider = ({ children }) => {
    const [attachedFile, setAttachedFile] = useState({
        filestoDisplay: null,
        files: null,
        chatId: null
    });

    return (
        <fileAttachedContext.Provider value={{ attachedFile, setAttachedFile }}>
            {children}
        </fileAttachedContext.Provider>
    )
};





export default function useAttachedFile() {
    return useContext(fileAttachedContext);
}
