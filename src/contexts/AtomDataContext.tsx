import React, { createContext, useState, ReactNode, useContext } from "react";

type AtomDataContextType = {
  proton: number;
  setProton: (v: number) => void;
  neutron: number;
  setNeutron: (v: number) => void;
  electron: number;
  setElectron: (v: number) => void;
};

/** Context to hold atom data like proton count */
const AtomDataContext = createContext<AtomDataContextType>({
  proton: 0,
  setProton: () => {},
  neutron: 0,
  setNeutron: () => {},
  electron: 0,
  setElectron: () => {},
});

/** Hook to use the AtomDataContext */
export const useAtomData = () => useContext(AtomDataContext);

/** Provider component to wrap around parts of the app that need atom data */
export const AtomDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [proton, setProton] = useState(1);
  const [neutron, setNeutron] = useState(1);
  const [electron, setElectron] = useState(1);

  return (
    <AtomDataContext.Provider value={{ proton: proton, setProton: setProton, neutron: neutron, setNeutron: setNeutron, electron: electron, setElectron: setElectron }}>
      {children}
    </AtomDataContext.Provider>
  );
};
