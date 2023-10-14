//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React from "react";
import Header from "../Header/Header";
import './App.css';

function App(){
    return(
        <div className="App"> 
            <Header/>
        </div> 
    );
}

export default App;