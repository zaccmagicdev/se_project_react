import * as React from 'react';
import './ToggleSwitch.css'

function ToggleSwitch(props){

  console.log(props.handleCallback)

  return (
    <div className="container">
      {props.label}{" "}
      <div className="toggle-switch">
        <input type="checkbox" className="checkbox"
               name={props.label} id={props.label} onChange={props.handleCallback}/>
        <label className="label" htmlFor={props.label}>
          <span className="inner" />
          <span className="switch" />
        </label>
      </div>
    </div>
  );
};

export default ToggleSwitch;