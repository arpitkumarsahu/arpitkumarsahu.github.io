import React, {useContext} from "react";
import StyleContext from "../../contexts/StyleContext";
import "./ToggleSwitch.css";

/** Light/dark theme toggle shown in the header. */
const ToggleSwitch = () => {
  const {isDark, changeTheme} = useContext(StyleContext);
  const label = isDark ? "Switch to light theme" : "Switch to dark theme";

  return (
    <button type="button" className="theme-toggle" onClick={changeTheme} aria-label={label} title={label}>
      <i className={isDark ? "fas fa-sun" : "fas fa-moon"} aria-hidden="true"></i>
    </button>
  );
};
export default ToggleSwitch;
