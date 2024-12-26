import compLogo from "/Users/ashish/Documents/Warrior/front_end/public/logo/qa (2).png";
import '../customStyle/style.css';
import { HiArrowNarrowRight } from "react-icons/hi";
import React, { useState } from "react";




export default function Signup() {
    const [fullname, setfullname] = useState("");
    const [username, setusername] = useState("");
    const [email, setemail] = useState("");
    const [password, setpassword] = useState("");
    const [error, setError] = useState("");

    const { setSignup2 } = useUser();





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
        <>
            <div className="modal-overlay flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 ">
                <div className="modal">
                    <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                        <img
                            alt="Your Company"
                            src={compLogo}
                            className="mx-auto h-10 w-auto"
                        />
                        <h2 className="mt-10 text-center text-2xl font-bold tracking-tight text-gray-900">
                            Sign up
                        </h2>
                    </div>

                    <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                        <form onSubmit={handleNext} className="space-y-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Fullname
                                </label>
                                <div className="mt-2">
                                    <input
                                        id="fullname"
                                        value={fullname}
                                        onChange={(e) => setfullname(e.target.value)}
                                        name="fullname"
                                        type="text"
                                        required
                                        autoComplete="fullname"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-900">
                                    Username
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={username}
                                        onChange={(e) => setusername(e.target.value)}
                                        id="username"
                                        name="username"
                                        type="text"
                                        required
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-900">
                                    Email address
                                </label>
                                <div className="mt-2">
                                    <input
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        id="email"
                                        name="email"
                                        type="email"
                                        required
                                        autoComplete="email"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center justify-between">
                                    <label htmlFor="password" className="block text-sm font-medium text-gray-900">
                                        Password
                                    </label>
                                </div>
                                <div className="mt-2">
                                    <input
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        autoComplete="current-password"
                                        className="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 outline outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline focus:outline-2 focus:-outline-offset-2 focus:outline-Custompurple sm:text-sm"
                                    />
                                </div>
                            </div>

                            <div>
                                <button
                                    type="submit"
                                    className="relative flex w-full items-center justify-center rounded-md bg-Custompurple px-3 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-purple-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                >
                                    <p>Next</p>
                                    <HiArrowNarrowRight className="absolute right-3" />
                                </button>
                            </div>
                        </form>

                        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

                        <p className="mt-10 text-center text-sm text-gray-500">
                            Already have an Account?{' '}
                            <a href="#" className="font-semibold text-Custompurple hover:text-purple-700">
                                Login
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}
