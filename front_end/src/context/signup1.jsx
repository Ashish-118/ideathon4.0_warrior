import { createContext, useContext, useState } from "react";



// Create context
export const Signup1Context = createContext(null); // Default value is null

// Provider component
export const Signup1Provider = ({ children }) => {
    const [Signup1, setSignup1] = useState(null); // Holds user information (JSON)

    return (
        <Signup1Context.Provider value={{ Signup1, setSignup1 }}>
            {children}
        </Signup1Context.Provider>
    )
};




// Custom hook to use UserContext
export default function useSignup1() {
    return useContext(Signup1Context);
}
