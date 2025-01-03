import { createContext, useContext, useState } from "react";



// Create context
export const pyqContext = createContext(null); // Default value is null

// Provider component
export const PyqProvider = ({ children }) => {
    const [Pyq, setPyq] = useState(null); // Holds user information (JSON)

    return (
        <pyqContext.Provider value={{ Pyq, setPyq }}>
            {children}
        </pyqContext.Provider>
    )
};

// export const pyqProvider = pyqContext.Provider;


// Custom hook to use pyqContext
export default function usePyq() {
    return useContext(pyqContext);
}
