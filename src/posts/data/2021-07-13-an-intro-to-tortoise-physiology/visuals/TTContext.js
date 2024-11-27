import { createContext } from "react";

// just initializing context, providing values in TheNeedledrop2021.js
const TTContext = createContext({});

export const TTProvider = TTContext.Provider;

export default TTContext;