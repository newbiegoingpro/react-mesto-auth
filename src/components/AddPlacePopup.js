import React from 'react';
import PopupWithForm from './PopupWithForm';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function AddPlacePopup(props) {

    const [place, setPlace] = React.useState('');
    const [link, setLink] = React.useState('');
    /*const [placeValidity, isPlaceValid] = React.useState(false);
    const [linkValidity, isLinkValid] = React.useState(false);
    const [linkValidity, isLinkValid] = React.useState(false);
*/
    function handlePlaceInput(e){
        setPlace(e.target.value);
    };
    function handleLinkInput(e){
        setLink(e.target.value);
    };
    function handleSubmit(e) {
        e.preventDefault();

        props.onAddNewCard({
            name: place,
            link
        })

        setPlace('');
        setLink('');
    };


    return (
        <PopupWithForm title='Новое Место' isshort={props.isshort} button='Сохранить' name='add' isopen={props.isopen} onClose={props.onClose} onSubmit={handleSubmit}>
            <input type="text" name="name" placeholder="Название" onChange={handlePlaceInput} value={place} className="popup__input popup__input_place" id="place-input" required minLength="2" maxLength="30" />
            <span id="place-input-error" className="popup__input-error"></span>
            <input type="url" name="link" placeholder="Ссылка на картинку" onChange={handleLinkInput} value={link} className="popup__input popup__input_link" id="link-input" required />
            <span id="link-input-error" className="popup__input-error"></span>
        </PopupWithForm>)
}
export default AddPlacePopup;