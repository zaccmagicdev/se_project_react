import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [input, setInput] = React.useState("");

  const inputRef = React.useRef();
  const errTextRef = React.useRef();
  const componentRef = React.useRef();

  const shakeCallback = React.useCallback(() => handleShake(), [props.errMessage]);

  React.useEffect(() => {
    if (props.errMessage !== "") {
     inputRef.current.classList.add("searchbar__input_bad-search");
     errTextRef.current.classList.add("searchbar__error-text_active");
    } else {
      inputRef.current.classList.remove("searchbar__input_bad-search");
      errTextRef.current.classList.remove("searchbar__error-text_active");
      //componentRef.current.classList.remove("searchbar_error");
    }
  }, [props.errMessage]);

function handleShake(){
    if (props.errMessage !== "") {
        setTimeout(() => componentRef.current.classList.add("searchbar_error"), 0);
        setTimeout(() => componentRef.current.classList.remove("searchbar_error"), 100);
    }
}

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function setData(e) {
    e.preventDefault();
    props.onData(input);
  }

  return (
    <div className="searchbar__container">
    <form ref={componentRef} className="searchbar" onSubmit={(e) => {
        setData(e);
        shakeCallback();
        }}>
      
        <label for="seachbar-input">
          <input
            ref={inputRef}
            required
            type="text"
            className="searchbar__input"
            id="searchbar-input"
            placeholder="Search for any location..."
            onChange={handleInputChange}
          />
        </label>
        <button className="searchbar__submit" type="submit"/>
      
    </form>
    <span ref={errTextRef} className="searchbar__error-text">
        {props.errMessage}
      </span>
    </div>
  );
}

export default SearchBar;
