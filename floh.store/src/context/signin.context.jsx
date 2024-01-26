import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);
    const [login, setLogin] = useState(false);

    const updateUserData = (newData) => {
        setUserData(newData);
    };

    const updateLogin = (newData) => {
        setLogin(newData);
    };

    return (
        <DataContext.Provider value={{ userData, login, updateUserData, updateLogin }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    const context = useContext(DataContext);
    if (!context) {
        throw new Error('useData must be used within a DataProvider');
    }
    return context;
};
