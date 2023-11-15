import * as React from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css'

function ToggleSwitch() {
    const { handleToggleSwitchChange } = React.useContext(CurrentTemperatureUnitContext);

    return (
        <>
            <input className='toggleswitch__checkbox'
                type="checkbox"
                
            />
            <label className='toggleswitch__label'>
                <span className='toggleswitch__button' />
            </label>
        </>
    )
}

export default ToggleSwitch;