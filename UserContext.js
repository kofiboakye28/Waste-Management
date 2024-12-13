import React, { createContext, useState, useContext } from "react";

// Create the UserContext
const UserContext = createContext();

// Custom hook to use the UserContext
export const useUser = () => useContext(UserContext);

// UserProvider component to wrap the app
export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(null); // Initialize the user state

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
