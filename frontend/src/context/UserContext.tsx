import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserContextType } from '../types/UserContext';
import { Role } from '../types/Role';

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{children: ReactNode}> = ({children}) => {
    const [role, setRole] = useState<Role>('guest');

    return (
        <UserContext.Provider value={{role, setRole}}>
            {children}
        </UserContext.Provider>
    );
};

export const useUserContext = (): UserContextType => {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUserContext must be used within a UserProvider');
    }
    return context;
}