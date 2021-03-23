import React from 'react';
import add from '../images/add-button.svg';
import Footer from './Footer.js';
import Header from './Header.js';
import Main from './Main.js';
import PopupWithForm from './PopupWithForm.js';
import ImagePopup from './ImagePopup.js';
import EditProfilePopup from './EditProfilePopup.js';
import EditAvatarPopup from './EditAvatarPopup.js';
import AddPlacePopup from './AddPlacePopup.js';
import api from '../utils/api';
import { CurrentUserContext } from '../contexts/CurrentUserContext';


function App() {
  const [isEditProfilePopupOpen, handleEditPopupVisibility] = React.useState(false)
  const [isAddPlacePopupOpen, handleAddPopupVisibility] = React.useState(false)
  const [isEditAvatarPopupOpen, handleAvatarPopupVisibility] = React.useState(false)
  const [isDeletePopupOpen, handleDeleteVisibility] = React.useState(false)
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' })
  const [currentUser, setCurrentUserInfo] = React.useState({})
  const [cards, setCards] = React.useState([])

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUserInfo(data)
      })
      .catch(err => alert(err))
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(err => alert(err))
  }, [])

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => alert(err));
  }

  function handleDeleteCard(card) {
    // const isMine = card._id.some(i => i._id === currentUser._id);
    api.removeCard(card._id)
      .then((data) => {
        setCards((data) => data.filter((c) => c._id !== card._id));
      })
      .catch(err => alert(err));
  }

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

  function handleUpdateUser(data) {
    api.updateUserInfo(JSON.stringify(data))
      .then(data => {
        setCurrentUserInfo(data);
        closeAllPopups();
      }
      )
      .catch(err => alert(err))
  }

  function handleUpdateAvatar(data) {
    api.updateUserPhoto(JSON.stringify(data))
      .then(data => {
        setCurrentUserInfo(data);
        closeAllPopups();
      }
      )
      .catch(err => alert(err))
  }

  function handleAddNewPlace(data) {
    api.addNewCard(JSON.stringify(data))
      .then((data) => {
        setCards([data, ...cards])
        closeAllPopups();
      })
      .catch(err => alert(err))
  }

  function closeAllPopups() {
    handleAddPopupVisibility(false)
    handleEditPopupVisibility(false)
    handleAvatarPopupVisibility(false)
    handleDeleteVisibility(false)
    setSelectedCard({ link: '', name: '' })
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Header />
        <Main onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
          onDeleteCard={handleDeleteClick} onCardClick={handleCardClick} cards={cards} onCardLike={handleCardLike} onCardDelete={handleDeleteCard}/>
        <Footer />
        <EditProfilePopup isopen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isshort={false} />
        <AddPlacePopup isshort={false} isopen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddNewPlace}/>
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isopen={isEditAvatarPopupOpen} onClose={closeAllPopups} isshort={true} />
        <PopupWithForm title='Вы уверены?' isshort={true} button='Да' name='delete' isopen={isDeletePopupOpen} onClose={closeAllPopups}>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />


      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
