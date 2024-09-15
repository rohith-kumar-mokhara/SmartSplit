import React, { createContext, useState, useContext } from 'react';

// Define the type for the context value
interface AmountContextType {
  amountPaid: number;
  total: number;
  setAmountPaid: (value: number) => void;
  setTotal: (value: number) => void;
}

// Create the context with a default value
const AmountContext = createContext<AmountContextType | undefined>(undefined);

// Provide a custom hook to use the context
export const useAmount = () => {
  const context = useContext(AmountContext);
  if (!context) {
    throw new Error('useAmount must be used within an AmountProvider');
  }
  return context;
};

// Create the provider component
export const AmountProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [amountPaid, setAmountPaid] = useState<number>(0);
  const [total, setTotal] = useState<number>(0);

  return (
    <AmountContext.Provider value={{ amountPaid, total, setAmountPaid, setTotal }}>
      {children}
    </AmountContext.Provider>
  );
};
