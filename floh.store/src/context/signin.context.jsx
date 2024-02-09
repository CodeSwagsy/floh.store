import {createContext, useContext, useEffect, useState} from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [login, setLogin] = useState(false);
    const [counter, setCounter] = useState(false);
    const [zipCodes, setZipCodes] = useState(null)
    const [searchCategory, setSearchCategory] = useState(null)
    const [searchQuery, setSearchQuery] = useState(null)
    const [searchedProducts, setSearchedProducts] = useState(null)
    const [queryError, setQueryError] = useState(null)
    const updateCounter = (count) => {
        setCounter(count);
    }

    const updateSearchQuery = (searchQuery) => {
        setSearchQuery(searchQuery)
    }

    const updateSearchCategory = (searchCategory) => {
        setSearchCategory(searchCategory);
    };

    const updateQueryError = (queryError) => {
        setQueryError(queryError);
    };

    const updateSearchedProducts = (searchedProducts) => {
        setSearchedProducts(searchedProducts)
    }

    const
    updateZipCodes = (zipCodes) => {
        setZipCodes(zipCodes);
    };

    const updateUserData = (newData) => {
        setUserData(newData);
    };

    const updateLogin = (newData) => {
        setLogin(newData);
    };

    const handleLogout = async () => {
        try {
            const response = await fetch(`${import.meta.env.VITE_API}/user/logout`, {
                method: "POST",
                mode: "cors",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
            });
            const data = await response.json();
            if (data.code === 200) {
                updateLogin(false);
                updateUserData(null);
                localStorage.removeItem("uid");
                localStorage.removeItem("login");
                localStorage.removeItem("loginData");
                console.log("Logged out");
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        const storedUserData = JSON.parse(localStorage.getItem("userData"));
        const storedLogin = localStorage.getItem("login") === "true";

        if (storedUserData) {
            setUserData(storedUserData);
        }

        if (storedLogin) {
            setLogin(storedLogin);
        }

        if (storedLogin) {
            const logoutTimer = setTimeout(() => {
                handleLogout();
            }, 59 * 60 * 1000);

            return () => clearTimeout(logoutTimer);
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("userData", JSON.stringify(userData));
        localStorage.setItem("login", login.toString());

        if (login) {
            const logoutTimer = setTimeout(() => {
                handleLogout();
            }, 59 * 60 * 1000);

            return () => clearTimeout(logoutTimer);
        }
    }, [userData, login]);

    return (
        <DataContext.Provider
            value={{
                searchQuery,
                updateSearchQuery,
                queryError,
                updateQueryError,
                searchCategory,
                updateSearchCategory,
                zipCodes,
                updateZipCodes,
                searchedProducts,
                updateSearchedProducts,
                userData,
                updateUserData,
                login,
                updateLogin,
                counter,
                updateCounter,
            }}
        >
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};
