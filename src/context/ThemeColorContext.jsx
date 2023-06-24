import React, { createContext, useState } from 'react'

export const ColorContext = createContext({})

const ThemeColorProvider = (props) => {
    const [darkTheme, setDarkTheme] = useState(false)

    const toggleDarkMode = () => {
        setDarkTheme(prev => !prev)
    }

    const colorContext = {
        changeColor: toggleDarkMode,
        isDark: darkTheme,
    }

    return <ColorContext.Provider value={colorContext}>
            {props.children}
        </ColorContext.Provider>
}

export default ThemeColorProvider