import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './LoginModal.css';

function LoginModal(props) {

    const [inputValEmail, setEmail] = useState('');
    const [inputValPassword, setPassword] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.submitMethod(inputValEmail, inputValPassword);
    }

    return (
        <ModalWithForm title="Login" name='loginmodal' buttonName="Next" onClose={props.handleCloseModal} handleSubmit={handleSubmit}>
            <label className='login__modal-label'>
                Email*
                <input className="login__modal-input" placeholder='Email' type="email" onChange={handleEmailChange} required value={inputValEmail} />
            </label>
            <label className='login__modal-label'>
                Password*
                <input className="login__modal-input" placeholder='Password' type="password" onChange={handlePasswordChange} required value={inputValPassword} />
            </label>
            <button type="button" className="login__modal-register-button" onClick={props.handleOpenRegistration}>or Register</button>
        </ModalWithForm>
    );
}

export default LoginModal;
