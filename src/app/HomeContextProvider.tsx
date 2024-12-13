"use client";

import {
  createContext,
  Dispatch,
  useContext,
  useState,
  SetStateAction,
  PropsWithChildren,
} from "react";

interface HomeContextProps {
  hoveredTab: string;
  setHoveredTab: Dispatch<SetStateAction<string>>;
}

// const HomeContext = createContext<HomeContextProps | null>({} as HomeContextProps);
const HomeContext = createContext<HomeContextProps | null>(null);

// PropsWithChildren; // same as {children?: ReactNode}

export const HomeProvider = ({ children }: PropsWithChildren) => {
  const [hoveredTab, setHoveredTab] = useState<string>("___");

  return (
    <HomeContext.Provider value={{ hoveredTab, setHoveredTab }}>
      {children}
    </HomeContext.Provider>
  );
};

export const useHome = () => {
  const context = useContext(HomeContext);
  if (!context) {
    throw new Error("useHomeContext must be used within a HomeProvider");
  }
  return context;
};
