import { createContext, useContext, useState } from "react";



// Create context
export const UserContext = createContext(null); // Default value is null

// Provider component
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Holds user information (JSON)

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
};

// export const UserProvider = UserContext.Provider;


// Custom hook to use UserContext
export default function useUser() {
    return useContext(UserContext);
}
