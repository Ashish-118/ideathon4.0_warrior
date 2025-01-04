import { createContext, useContext, useState } from "react";




export const pyqContext = createContext(null);

export const PyqProvider = ({ children }) => {
    const [Pyq, setPyq] = useState(null);

    return (
        <pyqContext.Provider value={{ Pyq, setPyq }}>
            {children}
        </pyqContext.Provider>
    )
};





export default function usePyq() {
    return useContext(pyqContext);
}
