import React from 'react';
import add from '../images/add-button.svg';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';



function App() {
  const [isEditProfilePopupOpen, handleEditPopupVisibility] = React.useState(false)
  const [isAddPlacePopupOpen, handleAddPopupVisibility] = React.useState(false)
  const [isEditAvatarPopupOpen, handleAvatarPopupVisibility] = React.useState(false)
  const [isDeletePopupOpen, handleDeleteVisibility] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' })


  function handleCardClick(data) {
    setSelectedCard(data)
  }

  function handleEditAvatarClick() {
    handleAvatarPopupVisibility(true)
  }
  function handleEditProfileClick() {
    handleEditPopupVisibility(true)
  }
  function handleAddPlaceClick() {
    handleAddPopupVisibility(true)
  }
  function handleDeleteClick() {
    handleDeleteVisibility(true)
  }


  function closeAllPopups() {
    handleAddPopupVisibility(false)
    handleEditPopupVisibility(false)
    handleAvatarPopupVisibility(false)
    handleDeleteVisibility(false)
    setSelectedCard({ link: '', name: '' })
  }

  return (
    <div className="App">
      <Header />
      <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
        onDeleteCard={handleDeleteClick} onCardClick={handleCardClick} />
      <Footer />
      <PopupWithForm title='Редактировать профиль' isshort={false} button='Сохранить' name='edit' isopen={isEditProfilePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" placeholder="Имя" value="" className="popup__input popup__input_name" id="name-input" required minLength="2" maxLength="40" />
        <span id="name-input-error" className="popup__input-error"></span>
        <input type="text" name="about" placeholder="Работа" value="" className="popup__input popup__input_profession" id="profession-input" required minLength="2" maxLength="200" />
        <span id="profession-input-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Новое Место' isshort={false} button='Сохранить' name='add' isopen={isAddPlacePopupOpen} onClose={closeAllPopups}>
        <input type="text" name="name" placeholder="Название" value="" className="popup__input popup__input_place" id="place-input" required minLength="2" maxLength="30" />
        <span id="place-input-error" className="popup__input-error"></span>
        <input type="url" name="link" placeholder="Ссылка на картинку" value="" className="popup__input popup__input_link" id="link-input" required />
        <span id="link-input-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Обновите Аватар' isshort={true} button='Сохранить' name='avatar' isopen={isEditAvatarPopupOpen} onClose={closeAllPopups}>
        <input type="url" name="avatar" placeholder="Ссылка на Аватар" value="" className="popup__input popup__input_link" id="avatar-input" required />
        <span id="avatar-input-error" className="popup__input-error"></span>
      </PopupWithForm>
      <PopupWithForm title='Вы уверены?' isshort={true} button='Да' name='delete' isopen={isDeletePopupOpen} onClose={closeAllPopups}>
      </PopupWithForm>
      <ImagePopup card={selectedCard} onClose={closeAllPopups} />


    </div>

  );
}

export default App;
