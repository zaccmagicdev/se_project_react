import React from 'react';
import './ModalWithForm.css';

function ModalWithForm(props){
    return(
        <div className="modal">
            <div className={`modal__container modal__container_type_${props.name}`}>
                <p className="modal__title">{props.title}</p>
                <div className='modal__btn-wrapper'>
                    <button className='modal__close-btn' onClick={props.onClose}></button>
                </div>
                <form className={`modal__form modal__form_type_${props.name}`}>
                    {props.children}
                    <button className ='modal__form-submit' type='submit' onSubmit={props.handleSubmit}>{props.buttonName}</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;