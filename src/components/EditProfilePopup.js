import React from 'react';
import PopupWithForm from './PopupWithForm';
import {CurrentUserContext} from '../contexts/CurrentUserContext';

function EditProfilePopup(props) {
    const [name, setName] = React.useState('');
    const [description, setDescription] = React.useState('');
    const currentUser = React.useContext(CurrentUserContext)

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser]);

    function handleNameInput(e){
        setName(e.target.value)
    }
    function handleDescriptionInput(e){
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault();

        props.onUpdateUser({
          name,
          about: description,
        });
      }

    return (
        <PopupWithForm title='Редактировать профиль' isshort={props.isshort} button='Сохранить' name='edit' isopen={props.isopen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Имя" value={name} onChange={handleNameInput} className="popup__input popup__input_name" id="name-input" required minLength="2" maxLength="40" />
            <span id="name-input-error" className="popup__input-error"></span>
            <input type="text" name="about" placeholder="Работа" value={description} onChange={handleDescriptionInput} className="popup__input popup__input_profession" id="profession-input" required minLength="2" maxLength="200" />
            <span id="profession-input-error" className="popup__input-error"></span>
        </PopupWithForm>)

}

export default EditProfilePopup;