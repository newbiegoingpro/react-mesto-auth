import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditAvatarPopup(props) {
    const avatarRef = React.useRef()
    
    function handleSubmit(e) {
        e.preventDefault();
      
        props.onUpdateAvatar({
          avatar: avatarRef.current.value,
        });
        avatarRef.current.value = '';
      }

    return (
        <PopupWithForm title='Обновите Аватар' isshort={props.isshort} button='Сохранить' name='avatar' isOpen={props.isOpen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input ref={avatarRef} type="url" name="avatar" placeholder="Ссылка на Аватар" className="popup__input popup__input_link" id="avatar-input" required />
            <span id="avatar-input-error" className="popup__input-error"></span>
        </PopupWithForm>)

}

export default EditAvatarPopup;