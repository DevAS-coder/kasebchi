"use client";
import { createContext, useContext } from 'react';
import React from 'react';

interface User {
  user_id: string,
  phoneNumber: string;
  password: string;
  role: string;
  isAuthenticated:boolean,
  isExisted:boolean
}

interface UsersContextType {
  users: User;
  setUsers: React.Dispatch<React.SetStateAction<User>>;
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
  const [users, setUsers] = React.useState<User>();

  return (
    <UsersContext.Provider value={{ users, setUsers }}>
      {children}
    </UsersContext.Provider>
  );
};
export default UsersContext;
