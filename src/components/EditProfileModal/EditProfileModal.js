import React, { useState } from "react";
import ModalWithForm from '../ModalWithForm/ModalWithForm';
import './EditProfileModal.css'

function EditProfileModal(props) {

    const [inputValName, setName] = useState(props.name);
    const [inputValAvatar, setAvatar] = useState(props.avatar);

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
                <input className="profile-edit__input" value={inputValName} placeholder='Name' type="text" onChange={handleNameChange} required />
            </label>
            <label className='profile-edit__label'>
                Avatar URL
                <input className="profile-edit__input" value={inputValAvatar} placeholder='Avatar URL' type="url" onChange={handleAvatarChange} />
            </label>
        </ModalWithForm>
    );
}

export default EditProfileModal;