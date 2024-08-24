import React from 'react'
import './SearchBar.css'

function SearchBar(props) {

    const [input, setInput] = React.useState("");

    function handleInputChange(e) {
        setInput(e.target.value)
    }

    function setData(e){
        console.log(input)
        e.preventDefault();
       props.onData(input)
    }

    return (
        <form className='searchbar' onSubmit={setData}>
            <label for="seachbar-input">
                <input required type="text" id="searchbar-input"placeholder='Search for any location...' onChange={handleInputChange}/>
            </label>
            <button className="searchbar__submit" type="submit" />
        </form>
    )
}

export default SearchBar;