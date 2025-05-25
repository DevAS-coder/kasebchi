"use client";
import { createContext, useContext, useState, ReactNode } from 'react';

interface WholeSalerInfo {
  user_id: string,
  companyName: string;
  address: string;
  contactPerson: string;
  phoneNumber: string;
  email: string;
  taxId: string;
}

interface WholeSalerContextType {
  wholeSalerInfo: WholeSalerInfo;
  updateWholeSalerInfo: (info: Partial<WholeSalerInfo>) => void;
  resetWholeSalerInfo: () => void;
}

const defaultWholeSalerInfo: WholeSalerInfo = {
  user_id: '',
  companyName: '',
  address: '',
  contactPerson: '',
  phoneNumber: '',
  email: '',
  taxId: '',
};

const WholeSalerContext = createContext<WholeSalerContextType | undefined>(undefined);

export const WholeSalerProvider = ({ children }: { children: ReactNode }) => {
  const [wholeSalerInfo, setWholeSalerInfo] = useState<WholeSalerInfo>(defaultWholeSalerInfo);

  const updateWholeSalerInfo = (info: Partial<WholeSalerInfo>) => {
    setWholeSalerInfo(prevInfo => ({
      ...prevInfo,
      ...info
    }));
    
  };

  const resetWholeSalerInfo = () => {
    setWholeSalerInfo(defaultWholeSalerInfo);
  };

  return (
    <WholeSalerContext.Provider value={{ wholeSalerInfo, updateWholeSalerInfo, resetWholeSalerInfo }}>
      {children}
    </WholeSalerContext.Provider>
  );
};

export const useWholeSaler = () => {
  const context = useContext(WholeSalerContext);
  if (context === undefined) {
    throw new Error('useWholeSaler must be used within a WholeSalerProvider');
  }
  return context;
};
