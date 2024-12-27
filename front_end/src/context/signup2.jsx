import { createContext, useContext, useState } from "react";



// Create context
export const Signup2Context = createContext(null); // Default value is null

// Provider component
export const Signup2Provider = ({ children }) => {
    const [Signup2, setSignup2] = useState(null); // Holds user information (JSON)

    return (
        <Signup2Context.Provider value={{ Signup2, setSignup2 }}>
            {children}
        </Signup2Context.Provider>
    )
};




// Custom hook to use UserContext
export default function useSignup2() {
    return useContext(Signup2Context);
}
