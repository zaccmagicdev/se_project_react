import * as React from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css'

function ToggleSwitch() {
    const { handleToggleSwitchChange } = React.useContext(CurrentTemperatureUnitContext);

    return (
        <>
        <input
          className="react-switch-checkbox"
          id={`react-switch-new`}
          type="checkbox"
          onChange={handleToggleSwitchChange}
        />
        <label
          className="react-switch-label"
          htmlFor={`react-switch-new`}
        >
          <span className={`react-switch-button`} />
          <span className='toggleswitch__element'>F</span>
          <span className='toggleswitch__element'>C</span>
        </label>
      </>
    )
}

export default ToggleSwitch;