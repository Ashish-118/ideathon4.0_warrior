// import React, { useRef, useState } from 'react';
// import useUser from "../context/user";
// import axios from 'axios';

// function BookUploader() {
//     const { user } = useUser();

//     const [forYear, setforYear] = useState("");
//     const [author, setauthor] = useState("");

//     const [title, settitle] = useState("");
//     const [bookPdf, setbookPdf] = useState(null);
//     const [StatusMessage, setStatusMessage] = useState("");
//     const [loading, setLoading] = useState(false);
//     const fileInputRef = useRef(null)
//     const handleFileChange = (event, setFile) => {
//         const file = event.target.files[0];
//         setFile(file);
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         console.log(StatusMessage, bookPdf)
//         setLoading(true);
//         const formData = new FormData();
//         try {
//             const token = user?.data?.accessToken;
//             formData.append("title", title.trim());
//             formData.append("author", author.trim());
//             formData.append("forYear", forYear.trim());

//             if (bookPdf) {
//                 formData.append("bookPdf", bookPdf);
//             }


//             const bookUploadResponse = await axios.post(
//                 "http://localhost:8000/api/v1/users/book/upload",
//                 formData,
//                 {
//                     headers: {
//                         Authorization: `Bearer ${token}`,
//                     },
//                 }
//             );
//             console.log(bookUploadResponse)
//             if (bookUploadResponse.status === 200) {
//                 setStatusMessage("success");


//             }
//         } catch (error) {

//             setStatusMessage("all reqruired fields are marked *  and one of the solution method is also required");
//         } finally {
//             setLoading(false);
//             setforYear("");
//             setbookPdf(null);

//             settitle("");
//             setauthor("");
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
//                         Name of the Book*
//                     </label>
//                 </div>
//                 <div className="relative z-0 w-full mb-5 group">
//                     <input
//                         type="text"
//                         value={author}
//                         onChange={(e) => setauthor(e.target.value)}
//                         name="floating_author"
//                         id="floating_author"
//                         className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none focus:outline-none focus:ring-0 focus:border-blue-600 peer"
//                         placeholder=" "
//                         required
//                     />
//                     <label
//                         htmlFor="floating_author"
//                         className="peer-focus:font-medium absolute text-sm text-gray-500 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
//                     >
//                         author*
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

//                 </div>
//                 <div className="max-w-lg mx-auto">
//                     <label className="block mb-2 text-sm font-medium text-gray-500" htmlFor="book_pdf">
//                         upload Book*
//                     </label>
//                     <input
//                         className="block w-full mb-5 text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
//                         id="book_pdf"
//                         accept="application/pdf"
//                         type="file"
//                         ref={fileInputRef}
//                         onChange={(e) => handleFileChange(e, setbookPdf)}
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

// export default BookUploader;





import React, { useRef, useState } from 'react';
import useUser from "../context/user";
import axios from 'axios';

function BookUploader() {
    const { user } = useUser();
    const [formData, setFormData] = useState({
        forYear: "",
        author: "",
        title: "",
        bookPdf: null,
    });
    const [statusMessage, setStatusMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const fileInputRef = useRef(null);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData((prev) => ({ ...prev, bookPdf: file }));
    };

    const resetForm = () => {
        setFormData({
            forYear: "",
            author: "",
            title: "",
            bookPdf: null,
        });
        if (fileInputRef.current) fileInputRef.current.value = "";
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = user?.data?.accessToken;
            const data = new FormData();
            data.append("title", formData.title.trim());
            data.append("author", formData.author.trim());
            data.append("forYear", formData.forYear.trim());
            if (formData.bookPdf) data.append("bookPdf", formData.bookPdf);

            const response = await axios.post(
                "http://localhost:8000/api/v1/users/book/upload",
                data,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200) {
                setStatusMessage("success");
                resetForm();
            }
        } catch (error) {
            setStatusMessage("error");
        } finally {
            setLoading(false);
            setTimeout(() => setStatusMessage(""), 5000);
        }
    };

    return (
        <div>
            {statusMessage && (
                <div
                    className={`w-full max-w-sm mx-auto my-5 p-4 rounded-lg shadow-md ${statusMessage === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                        }`}
                >
                    <p className="text-center text-lg font-bold">
                        {statusMessage === "success" ? "Upload Successful!" : "Upload Failed! Please try again."}
                    </p>
                </div>
            )}

            <form
                onSubmit={handleSubmit}
                className="max-w-md mx-auto border py-4 px-4 border-gray-300 rounded-md bg-white"
            >
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="title"
                        value={formData.title}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
                    >
                        Name of the Book*
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="author"
                        value={formData.author}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
                    >
                        Author*
                    </label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="number"
                        name="forYear"
                        value={formData.forYear}
                        onChange={handleInputChange}
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        required
                    />
                    <label
                        className="peer-focus:font-medium absolute text-sm text-gray-500 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:text-blue-600"
                    >
                        For Year*
                    </label>
                </div>

                <div className="max-w-lg mx-auto">
                    <label className="block mb-2 text-sm font-medium text-gray-500" htmlFor="book_pdf">
                        Upload Book*
                    </label>
                    <input
                        type="file"
                        id="book_pdf"
                        accept="application/pdf"
                        ref={fileInputRef}
                        onChange={handleFileChange}
                        className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                        required
                    />
                </div>

                <button
                    type="submit"
                    className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full px-5 py-2.5 mt-5 ${loading ? "cursor-not-allowed opacity-50" : ""
                        }`}
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}

export default BookUploader;
