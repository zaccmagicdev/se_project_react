import React from 'react';
import './ItemModal.css';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';

function ItemModal(props) {

    const { currentUser } = React.useContext(CurrentUserContext);
    let isOwn;
    if (currentUser !== null) {
        isOwn = props.currentCard.owner === currentUser._id;
    } else {
        isOwn = false;
    }


    const itemDeleteButtonClassName = (
        `itemmodal__delete-button ${isOwn ? 'itemmodal__delete-button_visible' : 'itemmodal__delete-button_hidden'}`
    );

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
                        <button className={itemDeleteButtonClassName} onMouseDown={props.onDelete}>Delete item</button>
                    </div>
                    <p>Weather: {props.temp}</p>
                </div>
            </div>
        </div>
    );
}

export default ItemModal;