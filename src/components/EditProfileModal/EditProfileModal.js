import React, { useState } from "react";
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditProfileModal.css'

function EditProfileModal(props) {

    const [inputValName, setName] = useState('');
    const [inputValAvatar, setAvatar] = useState('');

    function handleNameChange(e) {
        setName(e.target.value);
    }

    function handleAvatarChange(e) {
        setAvatar(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault();
        props.submitMethod(inputValName, inputValAvatar);
    }

    return (
        <ModalWithForm title="Change Profile Data" name='edit-profile' buttonName="Save Changes" onClose={props.handleCloseModal} handleSubmit={handleSubmit}>
            <label className='profile-edit__label'>
                Name*
                <input className="profile-edit__input" placeholder='Name' type="text" onChange={handleNameChange}></input>
            </label>
            <label className='profile-edit__label'>
                Avatar URL
                <input className="profile-edit__input" placeholder='Avatar URL' type="url" onChange={handleAvatarChange}></input>
            </label>
        </ModalWithForm>
    );
}

export default EditProfileModal;