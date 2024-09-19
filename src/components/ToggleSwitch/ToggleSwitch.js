import * as React from 'react';
import './ToggleSwitch.css'
import { set } from 'mongoose';

function ToggleSwitch(props){

  const [isToggled, setToggled] = React.useState(false);
  const togSwitch = React.useRef();

 

  React.useEffect(() => {
    isToggled ? togSwitch.checked = true : togSwitch.checked = false
    props.handleCallback();
  }, [isToggled])

  return (
    <div className='toggleswitch'>
    <p className='toggle__text'>{props.label + ''}</p>
    <div className="container">
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={props.label} id={props.label} onChange={setToggled(true)} useRef={props.label} />
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
    </div>
  );
};

export default ToggleSwitch;