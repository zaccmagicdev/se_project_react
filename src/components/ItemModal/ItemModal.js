import React from 'react';
import './ItemModal.css';

function ItemModal(props) {
    return (
        <div className='itemmodal'>
            <div className='itemmodal__container'>
                <button className='itemmodal__close-btn' onClick={props.onClose}></button>
                <img src={props.link} alt={props.name} className='itemmodal__img' />
                <div className='itemmodal__caption-box'>
                    <p>{props.name}</p>
                    <p>Weather: {props.temp}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;