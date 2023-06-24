import React, { useContext } from "react";
import { ColorContext } from "../context/ThemeColorContext";

export const useThemeContext = () => {
    return useContext(ColorContext)
}
