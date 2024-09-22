import { useState, createContext, useContext } from "react";  // Import useContext here

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    console.log("AuthProvider");
    const [user, setUser] = useState(null);

    const setAuth = (authUser) => {
        setUser(authUser);
    };

    const setUserData = (userData) => {
        setUser({ ...userData });
    };

    return (
        <AuthContext.Provider value={{ user, setAuth, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
