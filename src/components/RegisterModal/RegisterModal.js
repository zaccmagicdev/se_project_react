import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import './RegisterModal.css';

function RegisterModal(props) {

    const [inputValEmail, setEmail] = useState('');
    const [inputValPassword, setPassword] = useState('');
    const [inputValName, setName] = useState('');
    const [inputValAvatar, setAvatar] = useState('');

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.submitMethod(inputValName, inputValAvatar, inputValEmail, inputValPassword);
    }

    return (
        <ModalWithForm title="Sign up" name='registration' buttonName="Next" onClose={props.handleCloseModal} handleSubmit={handleSubmit}>
            <label className='registration__modal-label'>
                Email*
                <input className="registration__modal-input" placeholder='Email' type="email" onChange={handleEmailChange} required value={inputValEmail}/>
            </label>
            <label className='registration__modal-label'>
                Password*
                <input className="registration__modal-input" placeholder='Password' type="password" onChange={handlePasswordChange} required value={inputValPassword}/>
            </label>
            <label className='registration__modal-label'>
                Name*
                <input className="registration__modal-input" placeholder='Name' type="text" onChange={handleNameChange} required value={inputValName}/>
            </label>
            <label className='registration__modal-label'>
                Avatar URL
                <input className="registration__modal-input" placeholder='Avatar URL' type="url" onChange={handleAvatarChange} value={inputValAvatar}/>
            </label>
            <button type="button" className="registration__modal-login-button" onClick={props.handleOpenLogin}>or Log in</button>
        </ModalWithForm>
    );
}

export default RegisterModal;
