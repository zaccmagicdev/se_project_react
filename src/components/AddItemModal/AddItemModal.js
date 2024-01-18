import * as React from 'react';
import ModalWithForm from '../ModalWithForm/ModalWithForm';

function AddItemModal(props){

    const [inputValueName, setInputValueName] = React.useState('');
    const [inputValueLink, setInputValueLink] = React.useState('');
    const [inputValueWeather, setInputValueWeather] = React.useState('');

    function handleNameChange(e){
        setInputValueName(e.target.value);
    }

    function handleLinkChange(e){
        setInputValueLink(e.target.value);
    }

    function handleWeatherInput(e){
        setInputValueWeather(e.target.value);
    }

    function handleSubmit(e){
        e.preventDefault();
        props.submitMethod(inputValueName, inputValueLink, inputValueWeather);
        
    }

    return(
        <ModalWithForm title="New Garment" name="clothing" buttonName="Add garment" onClose={props.handleCloseModal} handleSubmit={handleSubmit}>
        <label>
            Name
            <input className="clothing__modal-input" placeholder='Name' type="text" onChange={handleNameChange}></input>
        </label>
        <label>
            Image
            <input className="clothing__modal-input" placeholder='Image URL' type="url" onChange={handleLinkChange}></input>
        </label>
        <section className="clothing__modal-label-radio">
            Select the weather type:
            <label className="clothing__modal-radio-name">
                <input className="clothing__modal-radio-btn" type="radio" name="button" value='hot' onChange={handleWeatherInput} required></input>
                <span>Hot</span>
            </label>
            <label className="clothing__modal-radio-name">
                <input className="clothing__modal-radio-btn" type="radio" name="button" value='warm' onChange={handleWeatherInput} required></input>
                <span>Warm</span>
            </label>
            <label className="clothing__modal-radio-name">
                <input className="clothing__modal-radio-btn" type="radio" name="button" value='cold' onChange={handleWeatherInput} required></input>
                <span>Cold</span>
            </label>
        </section>
    </ModalWithForm>
    );
}

export default AddItemModal;