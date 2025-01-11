import React, { useState, useEffect } from "react";

import { HiChevronDown } from "react-icons/hi";
import axios from "axios";

import useBook from '../context/getBook';
function FilterBook() {
    const [AuthorName, setAuthorName] = useState("");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [authorNameList, setauthorNameList] = useState([])
    const [NameList, setNameList] = useState([])
    const [isDropdownOpenAuthor, setIsDropdownOpenAuthor] = useState(false);
    const [filteredAuthorList, setFilteredAuthorList] = useState([]);
    const [filteredNameOfBookList, setFilteredNameOfBookList] = useState([]);
    const [searchTermAuthor, setSearchTermAuthor] = useState("");
    const [searchTerm, setSearchTerm] = useState("");
    const [year, setYear] = useState("");
    const [nameOfBook, setnameOfBook] = useState("");
    const [disabledButtons, setDisabledButtons] = useState({});
    const { Book, setBook } = useBook();



    useEffect(() => {
        if (Book) {
            const uniqueAuthors = [...new Set(Book.map((book) => book.author))];
            const uniqueTitles = [...new Set(Book.map((book) => book.title))];
            setauthorNameList(uniqueAuthors);
            setNameList(uniqueTitles);
            setFilteredAuthorList(uniqueAuthors);
            setFilteredNameOfBookList(uniqueTitles);
        }
    }, [Book]);


    const filterBook = async () => {
        try {
            const filteredBookResponse = await axios.post("http://localhost:8000/api/v1/users/book/filter", {
                author: AuthorName || null,
                forYear: year || null,
                title: nameOfBook || null,
            });
            if (filteredBookResponse.status === 200) {
                setBook(Array.from(filteredBookResponse.data.data));
            }
        } catch (error) {
            console.error("Error while filtering Books:", error);
        }
    };

    useEffect(() => {
        if (AuthorName || year || nameOfBook) {
            filterBook();
        }
    }, [AuthorName, year, nameOfBook]);


    const toggleDropdownAuthor = () => {
        setIsDropdownOpenAuthor(!isDropdownOpenAuthor);
        setIsDropdownOpen(false);
    };
    const toggleDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
        setIsDropdownOpenAuthor(false);
    };


    const handleAuthorSelect = (author) => {
        setAuthorName(author);
        setIsDropdownOpenAuthor(false);
    };


    const handleNameSelect = (author) => {
        setnameOfBook(author);
        setIsDropdownOpen(false);
    };



    const handleYearClick = (yearValue) => {
        setYear(yearValue);
        setDisabledButtons({ [yearValue]: true });
    };



    const handleSearchChangeAuthor = (e) => {

        const searchValue = e.target.value.toLowerCase();
        setSearchTermAuthor(searchValue);
        const filteredList = authorNameList.filter((author) =>
            author.toLowerCase().includes(searchValue)
        );
        setFilteredAuthorList(filteredList);
    };


    const handleSearchChangeName = (e) => {

        const searchValue = e.target.value.toLowerCase();
        setSearchTerm(searchValue);
        const filteredList = NameList.filter((author) =>
            author.toLowerCase().includes(searchValue)
        );
        setFilteredNameOfBookList(filteredList);
    };



    return (
        <div className="w-[220px] ml-5 border h-[550px] text-center rounded-[10px] bg-filterBG items-center sticky">
            <h1 className="text-menuItem text-3xl font-mono mt-[30px] underline underline-offset-4">Filters</h1>


            <h2 className="text-menuItem font-baloo text-xl font-bold mt-[30px] mb-[10px]">Year of Study:</h2>
            <div className="flex flex-col items-center">
                {[
                    { label: "1st year", value: "1" },
                    { label: "2nd year", value: "2" },
                    { label: "3rd year", value: "3" },
                    { label: "4th year", value: "4" },
                    { label: "5th year", value: "5" },
                ].map((yearObj, index) => (
                    <button
                        key={index}
                        value={yearObj.value}
                        onClick={(e) => handleYearClick(e.target.value)}
                        className={`mt-2 rounded-[7px] text-center w-[150px] h-[40px] ${disabledButtons[yearObj.value]
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-Custompurple hover:bg-purple-700"
                            } text-white font-baloo text-xl flex items-center justify-center`}
                        disabled={disabledButtons[yearObj.value]}
                    >
                        {yearObj.label}
                        <HiChevronDown className="ml-6" />
                    </button>
                ))}
            </div>


            <div className="flex justify-center items-center mt-[50px] mb-[20px]">
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdown}
                    className="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {nameOfBook || "select book"}
                    <HiChevronDown className="w-2.5 h-2.5 ml-3" />
                </button>
            </div>

            {isDropdownOpen && (
                <div
                    id="dropdown"
                    className="absolute bottom-[130px]  left-5 mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >

                    <div className="p-2">
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={handleSearchChangeName}
                            placeholder="Search Colleges"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                    </div>


                    <div className="py-1 overflow-y-scroll h-[200px]">
                        {
                            filteredNameOfBookList.length > 0 ? (
                                filteredNameOfBookList.map((name, i) => (
                                    <button key={i}
                                        value={name}
                                        onClick={() => { handleNameSelect(name) }}
                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {name}
                                    </button>
                                ))
                            )
                                :
                                (
                                    <div className="text-center text-sm text-gray-500 py-2">
                                        No book found
                                    </div>
                                )
                        }
                    </div>
                </div>
            )}


            <div className="flex justify-center items-center mt-[50px] mb-[20px]">
                <button
                    id="dropdownDefaultButton"
                    onClick={toggleDropdownAuthor}
                    className="text-white bg-indigo-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
                    type="button"
                >
                    {AuthorName || "select author"}
                    <HiChevronDown className="w-2.5 h-2.5 ml-3" />
                </button>
            </div>

            {isDropdownOpenAuthor && (
                <div
                    id="dropdown"
                    className="absolute bottom-[130px]  left-5 mb-2 z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44"
                >

                    <div className="p-2">
                        <input
                            type="text"
                            value={searchTermAuthor}
                            onChange={handleSearchChangeAuthor}
                            placeholder="Search author"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                        />
                    </div>


                    <div className="py-1 overflow-y-scroll h-[200px]">
                        {
                            filteredAuthorList.length > 0 ? (
                                filteredAuthorList.map((author, i) => (
                                    <button key={i}
                                        value={author}
                                        onClick={() => { handleAuthorSelect(author) }}
                                        className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                                    >
                                        {author}
                                    </button>
                                ))
                            )
                                :
                                (
                                    <div className="text-center text-sm text-gray-500 py-2">
                                        No author found
                                    </div>
                                )
                        }
                    </div>
                </div>
            )}



        </div>
    );
}

export default FilterBook;
