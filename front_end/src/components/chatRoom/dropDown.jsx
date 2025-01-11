
import { MdArrowDropDownCircle, MdOutlineAttachFile } from "react-icons/md";
import React, { useRef, useEffect, useState } from 'react';
import useAttachedFile from '../../context/attachementSelected';

export default function Dropdown({ chatId }) {
    const { attachedFile, setAttachedFile } = useAttachedFile();

    const [Label, setLabel] = useState(false)

    const handleFileChange = (e) => {
        setLabel(false)
        console.log('File input changed');
        const fileList = e.target.files;
        if (fileList && fileList.length > 0) {
            const filesArray = Array.from(fileList);
            setAttachedFile({
                filestoDisplay: filesArray,
                files: fileList,
                chatId: chatId,
            });
            console.log("Files Selected:", filesArray);
        }
    };

    // useEffect(() => {
    //     console.log(chatId, attachedFile, "hello world")
    // }, [attachedFile])



    return (
        <div className="relative inline-block text-left">
            <div>
                <div className="inline-flex justify-center">
                    <MdArrowDropDownCircle
                        onClick={() => {
                            setLabel(!Label)
                        }}

                        className="text-xl text-white" />
                </div>
            </div>

            <div
                className="absolute left-[20px] z-10 mt-2 w-[115px] origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black/5 transition focus:outline-none"
            >
                {
                    Label && <div className="py-1">
                        <label
                            htmlFor="dropwDown-file-upload"
                            className={` w-full cursor-pointer flex px-4 items-center py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900`}
                        >
                            Attach
                            <MdOutlineAttachFile className="ml-6 text-lg" />
                        </label>

                        <input
                            onChange={handleFileChange}
                            id="dropwDown-file-upload"
                            name="file-upload"
                            accept=".pdf, image/*, video/*"
                            type="file"
                            multiple
                            className="hidden"
                        />
                    </div>}
            </div>




        </div>
    );
}
