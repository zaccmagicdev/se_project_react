import * as React from "react";
import "./ToggleSwitch.css";

function ToggleSwitch(props) {
  const [toggled, setIsToggled] = React.useState(false);

  function toggle() {
    props.handleCallback();
    setIsToggled(!toggled);
  }

  return (
    <div
      onClick={toggle}
      className={`wrg-toggle ${toggled ? "wrg-toggle--checked" : ""}`}
    >
      <div className="wrg-toggle-container">
        <div className="wrg-toggle-uncheck">
        <img
            className="wrg-toggle__icon"
            src={props.icon1Link}
            alt="unchecked icon"
          />
        </div>
        <div className="wrg-toggle-check">
          <img
            className="wrg-toggle__icon"
            src={props.icon2Link}
            alt="checked icon"
          />
        </div>
      </div>
      <div className="wrg-toggle-circle"></div>
      <input
        className="wrg-toggle-input"
        type="checkbox"
        aria-label="Toggle Button"
      />
    </div>
  );
}

export default ToggleSwitch;
