import React from "react";
import "./SearchBar.css";

function SearchBar(props) {
  const [input, setInput] = React.useState("");

  const inputRef = React.useRef();
  const errTextRef = React.useRef();
  const componentRef = React.useRef();

  React.useEffect(() => {
    if (props.errMessage !== "") {
      console.log("hi");
      inputRef.current.classList.add("searchbar__input_bad-search");
      errTextRef.current.classList.add("searchbar__error-text_active");
      componentRef.current.classList.add("searchbar_error");
    } else {
      inputRef.current.classList.remove("searchbar__input_bad-search");
      errTextRef.current.classList.remove("searchbar__error-text_active");
      componentRef.current.classList.remove("searchbar_error");
    }
  }, [props.errMessage]);

  function handleInputChange(e) {
    setInput(e.target.value);
  }

  function setData(e) {
    e.preventDefault();
    props.onData(input);
  }

  return (
    <form ref={componentRef} className="searchbar" onSubmit={setData}>
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
      <button className="searchbar__submit" type="submit" />
      <span ref={errTextRef} className="searchbar__error-text">
        {props.errMessage}
      </span>
    </form>
  );
}

export default SearchBar;
