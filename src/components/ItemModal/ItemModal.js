import React from 'react';
import './ItemModal.css';

function ItemModal(props) {
    return (
        <div className='itemmodal'>
            <div className='itemmodal__container'>
                <div className='itemmodal__btn-wrapper'>
                    <button className='itemmodal__close-btn' onClick={props.onClose}></button>
                </div>
                <img src={props.link} alt={props.name} className='itemmodal__img' />
                <div className='itemmodal__caption-box'>
                    <div className='itemmodal__wrapper'>
                        <p>{props.name}</p>
                        <button className='itemmodal__delete-button' onMouseDown={props.onDelete}>Delete item</button>
                    </div>
                    <p>Weather: {props.temp}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;