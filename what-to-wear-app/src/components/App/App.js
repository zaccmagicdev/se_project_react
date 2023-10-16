//for the resposive design we can make the clothing components a grid
//layout and made the widest components equal the percentage of the
//screens viewwidth

//we will also call our api here for the weather and transfer that info
//via class decentiom

import React, { useState } from "react";
import Header from "../Header/Header";
import './App.css';
import Main from "../Main/Main";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import DefaultItems from "../../utils/DefaultItems";
import Footer from "../Footer/Footer";
import ItemCard from "../ItemCard/ItemCard";

function App() {

    const [activeModal, setActiveModal] = useState(false);
    const [cards, setCards] = useState([]);

    const handleCreateModal = () => {
        setActiveModal(true)
    };

    const handleCloseModal = () => {
        setActiveModal(false);
    };

    return (
        <div className="App">
            <Header location="San Diego" handleClick={handleCreateModal} />
            <Main>
                <ul>
                    <ItemCard name="Hat" link="https://i.ebayimg.com/thumbs/images/g/yT8AAOSwCctktK1~/s-l640.jpg"></ItemCard>
                    <ItemCard name="Jersey" link="https://i.ebayimg.com/images/g/Qq0AAOSwG59jrLZv/s-l1200.webp"></ItemCard>
                    <ItemCard name="Hat" link="https://i.ebayimg.com/thumbs/images/g/yT8AAOSwCctktK1~/s-l640.jpg"></ItemCard>
                    <ItemCard name="Hat" link="https://i.ebayimg.com/thumbs/images/g/yT8AAOSwCctktK1~/s-l640.jpg"></ItemCard>
                    
                </ul>
            </Main>
            <Footer />
            {activeModal && (
                <ModalWithForm title="New Garment" name="clothing" buttonName="Add garment" onClose={handleCloseModal}>
                    <label>
                        Name
                        <input className="clothing__modal-input" placeholder='Name' type="text"></input>
                    </label>
                    <label>
                        Image
                        <input className="clothing__modal-input" placeholder='Image URL' type="url"></input>
                    </label>
                    <label className="clothing__modal-label-radio">
                        Select the weather type:
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio"></input>
                            <span>Hot</span>
                        </label>
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio"></input>
                            <span>Warm</span>
                        </label>
                        <label className="clothing__modal-radio-name">
                            <input className="clothing__modal-radio-btn" type="radio"></input>
                            <span>Cold</span>
                        </label>
                    </label>
                </ModalWithForm>
            )}
        </div>
    );
}

export default App;