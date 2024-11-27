import { createContext } from "react";

// just initializing context, providing values in TheNeedledrop2021.js
const TNDContext = createContext({});

export const TNDProvider = TNDContext.Provider;

export default TNDContext;