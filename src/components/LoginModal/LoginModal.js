import React, { useState } from "react";
import ModalWithForm from "../ModalWithForm/ModalWithForm";
import { CurrentThemeContext } from "../../contexts/CurrentThemeContext";
import './LoginModal.css';

function LoginModal(props) {

    const { theme } = React.useContext(CurrentThemeContext)

    const [inputValEmail, setEmail] = useState('');
    const [inputValPassword, setPassword] = useState('');
    const color = theme === 'light' ? 'black' : 'white';

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
            <label className={`login__modal-label  login__modal-label_${theme}`}>
                Email*
                <input style={{borderColor: color}} 
                className="login__modal-input" placeholder='Email' type="email" onChange={handleEmailChange} required value={inputValEmail} />
            </label>
            <span style={{color: 'red', fontSize: '12px'}}>WARNING: This currently does not work currently as the back-end is being worked on :(</span>
            <label className={`login__modal-label  login__modal-label_${theme}`}>
                Password*
                <input style={{borderColor: color}} 
                className="login__modal-input" placeholder='Password' type="password" onChange={handlePasswordChange} required value={inputValPassword} />
            </label>
            <button type="button" className="login__modal-register-button" onClick={props.handleOpenRegistration}>or Register</button>
        </ModalWithForm>
    );
}

export default LoginModal;
