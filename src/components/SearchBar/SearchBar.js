import React from 'react'
import './SearchBar.css'

function SearchBar(props) {

    const [input, setInput] = React.useState("");

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function setData(e) {
        e.preventDefault();
        props.onData(input)
    }

    return (
        <form className='searchbar' onSubmit={setData}>
            <label for="seachbar-input">
                <input required type="text" className='searchbar__input' id="searchbar-input" placeholder='Search for any location...' onChange={handleInputChange} />
            </label>
            <button className="searchbar__submit" type="submit" />
            <span className='searchbar__error-text'>{props.error}</span>
        </form>
    )
}

export default SearchBar;