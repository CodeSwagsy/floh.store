import { createContext, useContext, useState } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
    const [userData, setUserData] = useState(null);

    const updateUserData = (newData) => {
        setUserData(newData);
    };

    return (
        <DataContext.Provider value={{ userData, updateUserData }}>
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
