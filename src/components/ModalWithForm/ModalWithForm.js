import React from 'react';
import './ModalWithForm.css';
import { CurrentThemeContext } from '../../contexts/CurrentThemeContext';

//at some point I should validate these forms

function ModalWithForm(props){

    const { theme } = React.useContext(CurrentThemeContext)

    return(
        <div className="modal">
            <div className={`modal__container modal__container_${theme}  modal__container_type_${props.name}`}>
                <button className='modal__close-btn' onClick={props.onClose}></button>
                <p className="modal__title">{props.title}</p>
                <form className={`modal__form modal__form_type_${props.name}`} onSubmit={props.handleSubmit}>
                    {props.children}
                    <button className ={`modal__form-submit modal__form-submit_${theme}`} type="submit">{props.buttonName}</button>
                </form>
            </div>
        </div>
    );
}

export default ModalWithForm;