import * as React from 'react';

const CurrentTemperatureUnitContext = React.createContext({

    currentTemperatureUnit: '',
    handleWeatherSwitchChange: () => {}
});

export {CurrentTemperatureUnitContext};