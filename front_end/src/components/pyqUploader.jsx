// import React, { useState, useRef } from 'react';
// import useUser from "../context/user";
// import axios from 'axios';

// function PyqUploader() {
//     const { user } = useUser();

//     const [forYear, setforYear] = useState("");
//     const [CourseCode, setCourseCode] = useState("");
//     const [paperYear, setpaperYear] = useState("");
//     const [title, settitle] = useState("");
//     const [paperPdf, setpaperPdf] = useState(null);
//     const [solutionPdf, setsolutionPdf] = useState(null);
//     const [solutionVideo, setsolutionVideo] = useState(null);
//     const [StatusMessage, setStatusMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const fileInputRef = useRef(null)
//     const handleFileChange = (event, setFile) => {
//         const file = event.target.files[0];
//         setFile(file);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         console.log(StatusMessage)
//         setLoading(true);
//         const formData = new FormData();
//         try {
//             const token = user?.data?.accessToken;
//             formData.append("title", title.trim());
//             formData.append("CourseCode", CourseCode.trim());
//             formData.append("forYear", forYear.trim());
//             formData.append("paperYear", paperYear.trim());
//             if (paperPdf) {
//                 formData.append("paperPdf", paperPdf);
//             }
//             if (solutionPdf) {
//                 formData.append("solutionPdf", solutionPdf);
//             }
//             if (solutionVideo) {
//                 formData.append("solutionVideo", solutionVideo);
//             }

//             const pyqUploadResponse = await axios.post(
//                 "http://localhost:8000/api/v1/users/pyq/Uploader",
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log(pyqUploadResponse)
//             if (pyqUploadResponse.status === 200) {
//                 setStatusMessage("success");


//             }
//         } catch (error) {
//             setStatusMessage("all reqruired fields are marked *  and one of the solution method is also required");
//         } finally {
//             setLoading(false);
//             setforYear("");
//             setpaperPdf(null);
//             setsolutionPdf(null);
//             setsolutionVideo(null);
//             settitle("");
//             setCourseCode("");
//             setpaperYear("");
//             if (fileInputRef.current) {
//                 fileInputRef.current.value = "";

//             }
//             setTimeout(() => {
//                 setStatusMessage("")
//             }, 5000);
//         }
//     };

//     return (

//         <div>

//             {StatusMessage && (
//                 <div className={`w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl ${StatusMessage === "success" ? "text-green-400" : "text-red-500"}`}>
//                     <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto mt-8 h-16 w-16" viewBox="0 0 20 20" fill="currentColor">
//                         <path
//                             fillRule="evenodd"
//                             d={StatusMessage === "success"
//                                 ? "M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
//                                 : "M10 18a8 8 8 0 100-16 8 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"}
//                             clipRule="evenodd"
//                         />
//                     </svg>
//                     <h1 className="mt-2 text-center text-2xl font-bold">
//                         {StatusMessage === "success" ? "Upload Successful!" : "Upload Failed!"}
//                     </h1>
//                 </div>
//             )}

//             <form
//                 onSubmit={handleSubmit}
//                 className="max-w-md mx-auto border py-3 px-3 border-gray-300 h-fit"
//             >

//                 <div className="relative z-0 w-full mb-5 group">
//                     <input
//                         type="text"
//                         id="floating_title"
//                         value={title}
//                         onChange={(e) => settitle(e.target.value)}
//                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         required
//                     />
//                     <label
//                         htmlFor="floating_title"
//                         className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                     >
//                         Title*
//                     </label>
//                 </div>
//                 <div className="relative z-0 w-full mb-5 group">
//                     <input
//                         type="text"
//                         value={CourseCode}
//                         onChange={(e) => setCourseCode(e.target.value)}
//                         name="floating_courseCode"
//                         id="floating_courseCode"
//                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         required
//                     />
//                     <label
//                         htmlFor="floating_courseCode"
//                         className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                     >
//                         Course code*
//                     </label>
//                 </div>
//                 <div class="grid md:grid-cols-2 md:gap-6">
//                     <div class="relative z-0 w-full mb-5 group">
//                         <input
//                             type="number"
//                             name="floating_forYear"
//                             value={forYear}
//                             onChange={(e) => setforYear(e.target.value)}
//                             id="floating_forYear"
//                             class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                             placeholder=" "
//                             required />
//                         <label for="floating_forYear" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">for Year*</label>
//                     </div>
//                     <div class="relative z-0 w-full mb-5 group">
//                         <input
//                             type="number"
//                             name="floating_PaperYear"
//                             value={paperYear}
//                             onChange={(e) => setpaperYear(e.target.value)}
//                             id="floating_PaperYear"
//                             class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                             placeholder=" "
//                             required />
//                         <label for="floating_PaperYear" class="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Paper Year*</label>
//                     </div>
//                 </div>
//                 <div className="max-w-lg mx-auto">
//                     <label className="block mb-2 text-sm font-medium text-gray-500" htmlFor="paper_pdf">
//                         Previous year Question paper*
//                     </label>
//                     <input
//                         ref={fileInputRef}
//                         className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//                         id="paper_pdf"
//                         type="file"
//                         onChange={(e) => handleFileChange(e, setpaperPdf)}
//                     />
//                 </div>
//                 <div className="max-w-lg mx-auto">
//                     <label className="block mb-2 text-sm font-medium text-gray-500" htmlFor="solution_pdf">
//                         Solution pdf / image
//                     </label>
//                     <input
//                         ref={fileInputRef}
//                         className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//                         id="solution_pdf"
//                         type="file"
//                         onChange={(e) => handleFileChange(e, setsolutionPdf)}
//                     />
//                 </div>
//                 <div className="max-w-lg mx-auto">
//                     <label className="block mb-2 text-sm font-medium text-gray-500" htmlFor="solution_video">
//                         Solution video (optional)
//                     </label>
//                     <input
//                         ref={fileInputRef}
//                         className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//                         id="solution_video"
//                         type="file"
//                         onChange={(e) => handleFileChange(e, setsolutionVideo)}
//                     />
//                 </div>
//                 <button
//                     type="submit"
//                     className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center ${loading ? "cursor-not-allowed opacity-50" : ""
//                         }`}
//                     disabled={loading}
//                 >
//                     {loading ? "Submitting..." : "Submit"}
//                 </button>
//             </form>
//         </div>

//     );
// }

// export default PyqUploader;







import React, { useState, useRef } from 'react';
import useUser from "../context/user";
import axios from 'axios';

function PyqUploader() {
    const { user } = useUser();

    const [forYear, setForYear] = useState("");
    const [courseCode, setCourseCode] = useState("");
    const [paperYear, setPaperYear] = useState("");
    const [title, setTitle] = useState("");
    const [paperPdf, setPaperPdf] = useState(null);
    const [solutionPdf, setSolutionPdf] = useState(null);
    const [solutionVideo, setSolutionVideo] = useState(null);
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleFileChange = (event, setFile) => {
        const file = event.target.files[0];
        setFile(file);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData();
        try {
            const token = user?.data?.accessToken;
            formData.append("title", title.trim());
            formData.append("CourseCode", courseCode.trim());
            formData.append("forYear", forYear.trim());
            formData.append("paperYear", paperYear.trim());
            if (paperPdf) formData.append("paperPdf", paperPdf);
            if (solutionPdf) formData.append("solutionPdf", solutionPdf);
            if (solutionVideo) formData.append("solutionVideo", solutionVideo);

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/pyq/Uploader",
                formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );

            if (response.status === 200) {
                setStatusMessage("Upload Successful!");
            }
        } catch (error) {
            setStatusMessage("Upload Failed! Ensure all required fields are filled and a solution is included.");
        } finally {
            setLoading(false);
            resetForm();
        }
    };

    const resetForm = () => {
        setForYear("");
        setPaperPdf(null);
        setSolutionPdf(null);
        setSolutionVideo(null);
        setTitle("");
        setCourseCode("");
        setPaperYear("");
        if (fileInputRef.current) fileInputRef.current.value = "";
        setTimeout(() => setStatusMessage(""), 5000);
    };

    return (
        <div className="max-w-3xl mx-auto py-8">
            {/* Status Message */}
            {statusMessage && (
                <div
                    className={`w-full max-w-lg mx-auto text-center py-4 px-6 mb-6 rounded-lg shadow-md ${statusMessage.includes("Successful")
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                        }`}
                >
                    <p className="font-medium">{statusMessage}</p>
                </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-lg shadow-md">
                {/* Title */}
                <div>
                    <label htmlFor="title" className="block text-sm font-medium text-gray-700">
                        Title*
                    </label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                    />
                </div>

                {/* Course Code */}
                <div>
                    <label htmlFor="courseCode" className="block text-sm font-medium text-gray-700">
                        Course Code*
                    </label>
                    <input
                        type="text"
                        id="courseCode"
                        value={courseCode}
                        onChange={(e) => setCourseCode(e.target.value)}
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                        required
                    />
                </div>

                {/* For Year and Paper Year */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label htmlFor="forYear" className="block text-sm font-medium text-gray-700">
                            For Year*
                        </label>
                        <input
                            type="number"
                            id="forYear"
                            value={forYear}
                            onChange={(e) => setForYear(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="paperYear" className="block text-sm font-medium text-gray-700">
                            Paper Year*
                        </label>
                        <input
                            type="number"
                            id="paperYear"
                            value={paperYear}
                            onChange={(e) => setPaperYear(e.target.value)}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500 text-sm"
                            required
                        />
                    </div>
                </div>

                {/* File Inputs */}
                <div>
                    <label htmlFor="paperPdf" className="block text-sm font-medium text-gray-700">
                        Previous Year Question Paper (PDF)*
                    </label>
                    <input
                        type="file"
                        id="paperPdf"
                        ref={fileInputRef}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                        onChange={(e) => handleFileChange(e, setPaperPdf)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="solutionPdf" className="block text-sm font-medium text-gray-700">
                        Solution PDF/Image
                    </label>
                    <input
                        type="file"
                        id="solutionPdf"
                        ref={fileInputRef}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                        onChange={(e) => handleFileChange(e, setSolutionPdf)}
                    />
                </div>
                <div>
                    <label htmlFor="solutionVideo" className="block text-sm font-medium text-gray-700">
                        Solution Video (Optional)
                    </label>
                    <input
                        type="file"
                        id="solutionVideo"
                        ref={fileInputRef}
                        className="mt-1 block w-full text-sm text-gray-500 border border-gray-300 rounded-md cursor-pointer"
                        onChange={(e) => handleFileChange(e, setSolutionVideo)}
                    />
                </div>

                {/* Submit Button */}
                <div>
                    <button
                        type="submit"
                        className={`w-full py-2 px-4 bg-blue-600 text-white text-sm font-medium rounded-lg shadow hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${loading ? "opacity-50 cursor-not-allowed" : ""
                            }`}
                        disabled={loading}
                    >
                        {loading ? "Submitting..." : "Submit"}
                    </button>
                </div>
            </form>
        </div>
    );
}

export default PyqUploader;
