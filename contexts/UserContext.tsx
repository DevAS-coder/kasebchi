"use client";
import { createContext, useContext } from 'react';
import React from 'react';

interface User {
  user_id: string,
  phoneNumber: string
  isExisted:boolean
}

interface UsersContextType {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}

const UsersContext = createContext<UsersContextType | undefined>(undefined);

export const useUsers = () => {
  const context = useContext(UsersContext);
  if (!context) {
    throw new Error('useUsers must be used within a UsersProvider');
  }
  return context;
};


export const UsersProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = React.useState<User>({
    user_id: '',
    phoneNumber: '',
    isExisted: false
  });

  return (
    <UsersContext.Provider value={{ user, setUser }}>
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContext;
