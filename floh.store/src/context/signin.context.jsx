import {createContext, useContext, useEffect, useState} from "react";

const DataContext = createContext();

export const DataProvider = ({children}) => {
    const [userData, setUserData] = useState(null);
    const [login, setLogin] = useState(false);
    const [counter, setCounter] = useState(false);
    const [searchCategory, setSearchCategory] = useState("")
    const [searchQuery, setSearchQuery] = useState("")
    const [searchedProducts, setSearchedProducts] = useState([])
    const [queryError, setQueryError] = useState(null)
    const [startSearch, setStartSearch] = useState(false)
    const [postalCode, setPostalCode] = useState(null)
    const [radius, setRadius] = useState(5)

    const updatePostalCode = (postalCode) => {
        setPostalCode(postalCode);
    }

    const updateRadius = (radius) => {
        setRadius(radius);
    }

    const fetchZips = async (postalCode, radius) => {
        if (!postalCode || postalCode.length < 5 || isNaN(postalCode)) {
            return;
        }
        console.log("FUNKTION WIRD AUSGEFÜHRT")
        try {
            const res = await fetch(`https://zip-api.eu/api/v1/radius/DE-${postalCode}/${radius}/km`, {
                method: "GET",
                mode: "cors",
            });
            const data = await res.json();
            if (Array.isArray(data)) {
                console.log("Funktion aus useContext: Log nach Fetchanfrage:", data);
                const postalCodesArray = await data.map((entry) => entry.postal_code);
                console.log("Funktion aus useContext: Log nach .map", postalCodesArray)
                return postalCodesArray
            } else if (data) {
                console.log("Funktion aus useContext: Log nach Fetchanfrage:", data);
                return([data.postal_code]);
            } else {
                console.error("Ungültiges Datenformat beim Abrufen der postalischen Codes:", data);
            }
        } catch (error) {
            console.error("Fehler beim Abrufen der postalischen Codes:", error);
        }
    };



    const updateCounter = (count) => {
        setCounter(count);
    }

    const updateStartSearch = (startSearch) => {
        setStartSearch(startSearch);
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
                radius,
                updateRadius,
                postalCode,
                updatePostalCode,
                fetchZips,
                startSearch,
                updateStartSearch,
                searchQuery,
                updateSearchQuery,
                queryError,
                updateQueryError,
                searchCategory,
                updateSearchCategory,
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
