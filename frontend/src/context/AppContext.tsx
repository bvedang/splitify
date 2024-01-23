import { createContext } from "react";
import { AppState } from "./types";

const AppContext = createContext<AppState | undefined>(undefined);

export default AppContext;
