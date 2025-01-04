import { createContext, useContext, useState } from "react";




export const bookContext = createContext(null);

export const BookProvider = ({ children }) => {
    const [Book, setBook] = useState(null);

    return (
        <bookContext.Provider value={{ Book, setBook }}>
            {children}
        </bookContext.Provider>
    )
};





export default function useBook() {
    return useContext(bookContext);
}
