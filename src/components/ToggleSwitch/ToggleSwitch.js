import * as React from 'react';
import { CurrentTemperatureUnitContext } from '../../contexts/CurrentTemperatureUnitContext';
import './ToggleSwitch.css'

function ToggleSwitch() {
  const { handleToggleSwitchChange } = React.useContext(CurrentTemperatureUnitContext);

  return (
    <>
      <input
        className="toggleswitch__checkbox"
        id={`react-switch-new`}
        type="checkbox"
        onChange={handleToggleSwitchChange}
      />
      <label
        className="toggleswitch__label"
        htmlFor={`react-switch-new`}
      >
        <span className={`toggleswitch__button`} />
        <span className='toggleswitch__element'>F</span>
        <span className='toggleswitch__element'>C</span>
      </label>
    </>
  )
}

export default ToggleSwitch;