import * as React from 'react';

const CurrentThemeContext = React.createContext({
    currentColorTheme: '',
    handleColorThemeChange: () => {}
})

export default CurrentThemeContext;