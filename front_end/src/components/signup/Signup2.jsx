
import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (2).png";
import '../customStyle/style.css';
import { HiArrowNarrowRight } from "react-icons/hi";
import React, { useState } from "react";
import useSignup2 from "../context/signup2";
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'
import { ChevronDownIcon } from '@heroicons/react/16/solid'
import axios from "axios"
import { Signup1Provider } from "../../context/signup1.jsx";


export default function Signup() {
    const [Mobile, setMobile] = useState('');
    const [collegeInfo, setcollegeInfo] = useState({
        collegeName: '',
        facultyOf: '',
        yearOfStudy: '',
        branch: ''
    })

    const { setSignup2 } = useSignup2();

    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setSelectedFile(file);
        console.log("Selected file:", file);
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:8000/api/v1/users/next/signup", {

            })
        }
        catch (err) {
            console.error("Error during signup:", err);
        }
    }

    return (
        <Signup1Provider>
            <div className="modal-overlay flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="overflow-scroll rounded-[10px]">
                    <div className="modal">
                        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                            <img
                                alt="Your Company"
                                src={compLogo}
                                className="mx-auto h-10 w-auto"
                            />
                            <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                                College Info
                            </h2>
                        </div>

                        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form className="space-y-6">
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">
                                        College name
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            id="collegeName"
                                            value={collegeInfo.collegeName}
                                            onChange={(e) =>
                                                setcollegeInfo((prev) => ({
                                                    ...prev,
                                                    collegeName: e.target.value,
                                                }))
                                            }
                                            name="collegeName"
                                            type="text"
                                            required
                                            autoComplete="collegeName"
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-sm font-medium text-gray-900">
                                        year
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={collegeInfo.yearOfStudy}
                                            onChange={(e) =>
                                                setcollegeInfo((prev) => ({
                                                    ...prev,
                                                    yearOfStudy: e.target.value,
                                                }))
                                            }
                                            id="year"

                                            type="text"
                                            required
                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-900">
                                        Branch
                                    </label>
                                    <div className="mt-2">
                                        <input
                                            value={collegeInfo.branch}
                                            onChange={(e) =>
                                                setcollegeInfo((prev) => ({
                                                    ...prev,
                                                    branch: e.target.value,
                                                }))
                                            }
                                            id="branch"

                                            type="text"
                                            required

                                            className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-900">
                                            faculty of
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            value={collegeInfo.facultyOf}
                                            onChange={(e) =>
                                                setcollegeInfo((prev) => ({
                                                    ...prev,
                                                    facultyOf: e.target.value,
                                                }))
                                            }
                                            id="facultyOf"
                                            type="text"
                                            required

                                            className="block w-full  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <label className="block text-sm font-medium text-gray-900">
                                            mobile no.
                                        </label>
                                    </div>
                                    <div className="mt-2">
                                        <input
                                            value={collegeInfo.Mobile}
                                            onChange={(e) =>
                                                setcollegeInfo((prev) => ({
                                                    ...prev,
                                                    Mobile: e.target.value,
                                                }))
                                            }
                                            id="mob"
                                            type="text"
                                            required

                                            className="block w-full  rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                        />
                                    </div>
                                </div>
                                <div className="col-span-full">
                                    <label htmlFor="cover-photo" className="block text-sm font-medium text-gray-900">
                                        Avatar
                                    </label>
                                    <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                                        <div className="text-center">
                                            <PhotoIcon aria-hidden="true" className="mx-auto size-12 text-gray-300" />
                                            <div className="mt-4 flex text-sm text-gray-600">
                                                <label
                                                    htmlFor="file-upload"
                                                    className="relative cursor-pointer rounded-md bg-white font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                                >
                                                    <span>Upload a file</span>
                                                    <input
                                                        id="file-upload"
                                                        name="file-upload"
                                                        type="file"
                                                        className="sr-only"
                                                        onChange={handleFileChange}
                                                    />
                                                </label>
                                                <p className="pl-1">or drag and drop</p>
                                            </div>
                                            <p className="text-xs text-gray-600">PNG, JPG up to 10MB</p>
                                            {selectedFile && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Selected: {selectedFile.name}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button
                                        type="submit"
                                        className="relative flex w-full items-center justify-center rounded-md bg-Custompurple px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                    >
                                        <p>Sign up</p>
                                        <HiArrowNarrowRight className="absolute right-3" />
                                    </button>
                                </div>
                            </form>




                        </div>
                    </div >
                </div>

            </div >
        </Signup1Provider>
    );
}

