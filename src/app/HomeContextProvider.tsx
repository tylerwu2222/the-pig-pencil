'use client'

import {
  createContext,
  Dispatch,
  useContext,
  useState,
  SetStateAction,
  FC,
  PropsWithChildren,
  ReactNode,
} from "react";

interface HomeContextProps {
  hoveredTab: string;
  setHoveredTab: Dispatch<SetStateAction<string>>;
}

const HomeContext = createContext<HomeContextProps>({} as HomeContextProps);

interface HomeProviderProps extends PropsWithChildren {}

export const HomeProvider: FC<HomeProviderProps> = ({ children }) => {
  const [hoveredTab, setHoveredTab] = useState<string>("___");

  return (
    <HomeContext.Provider value={{ hoveredTab, setHoveredTab }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => useContext(HomeContext);
