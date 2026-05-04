import React, { createContext, useState, ReactNode, useContext } from "react";

type AuthDataContextType = {
  authOpen: boolean;
  setAuthOpen: (v: boolean) => void;
  signup: boolean;
  setSignup: (v: boolean) => void;
  user: any;
  setUser: (v: any) => void;
  isConnected: boolean;
  setIsConnected: (v: boolean) => void;
};


/** Context to hold atom data like proton count */
const AuthDataContext = createContext<AuthDataContextType>({
  authOpen: false,
  setAuthOpen: () => {},
  signup: false,
  setSignup: () => {},
  user: null,
  setUser: () => {},
  isConnected: false,
  setIsConnected: () => {},
});

/** Hook to use the AuthDataContext */
export const useAuthData = () => useContext(AuthDataContext);

/** Provider component to wrap around parts of the app that need auth data */
export const AuthDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [authOpen, setAuthOpen] = useState(false);
  const [signup, setSignup] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [isConnected, setIsConnected] = useState(false);

  return (
    <AuthDataContext.Provider value={{ authOpen, setAuthOpen, signup, setSignup, user, setUser, isConnected, setIsConnected }}>
      {children}
    </AuthDataContext.Provider>
  );
};
