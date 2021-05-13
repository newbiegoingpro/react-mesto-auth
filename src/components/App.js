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
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import PopupFail from './PopupFail';
import PopupSuccess from './PopupSuccess';

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, handleEditPopupVisibility] = React.useState(false);
  const [isAddPlacePopupOpen, handleAddPopupVisibility] = React.useState(false);
  const [isEditAvatarPopupOpen, handleAvatarPopupVisibility] = React.useState(false);
  const [isDeletePopupOpen, handleDeleteVisibility] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({ link: '', name: '' });
  const [currentUser, setCurrentUserInfo] = React.useState({});
  const [cards, setCards] = React.useState([]);
  const [loggedIn, isLoggedIn] = React.useState(false);
  const [email, emailInput] = React.useState('');
  const [password, passwordInput] = React.useState('');
  const [headerMail, setMail] = React.useState('');
  const [isSuccessPopupOpen, setSuccessPopupVisibility] = React.useState(false);
  const [isFailPopupOpen, setFailPopupVisibility] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUserInfo(data)
      })
      .catch(err => alert(err));
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(err => alert(err));

    tokenCheck();  
  }, [])


  function onLogin({ email, password }) {
    return fetch(`https://auth.nomoreparties.co/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`err : ${res.status}`)
    }).then((data) => {
      localStorage.setItem('token', data.token)
      emailInput('');
      passwordInput('');
      handleLogin();
      history.push('/');

    }
    )
  }

  function onRegister({ email, password }){
    return fetch(`https://auth.nomoreparties.co/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password })
    }).then((res) => {
      if (res.ok) {
        return res.json();
        
      }
      return Promise.reject(`err : ${res.status}`)
    }).then((data) => {

      handleSuccessPopupVisibility();
      history.push('/signin')
    }).catch((err) =>{
      handleFailPopupVisibility()
    })
      
  }

  function onSignOut() {
    localStorage.removeItem('token');
    setMail('');
    history.push('/signin');
  }

  function tokenCheck() {
    fetch(`https://auth.nomoreparties.co/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then((res) => {
      if (res.ok) {
        return res.json()
      }
      return Promise.reject(`err : ${res.status}`)
    }).then((data) => {
      if (data) {
        console.log(data.data.email)
        setMail(data.data.email)
        handleLogin();
        history.push('/')
      }
    })
  }

  function handleLogin() {
    isLoggedIn(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch(err => alert(err));
  };

  function handleDeleteCard(card) {
    api.removeCard(card._id)
      .then((data) => {
        setCards((data) => data.filter((c) => c._id !== card._id));
      })
      .catch(err => alert(err));
  };

  function handleCardClick(data) {
    setSelectedCard(data)
  };
  function handleEditAvatarClick() {
    handleAvatarPopupVisibility(true)
  };
  function handleEditProfileClick() {
    handleEditPopupVisibility(true)
  };
  function handleAddPlaceClick() {
    handleAddPopupVisibility(true)
  };
  function handleDeleteClick() {
    handleDeleteVisibility(true)
  };
  function handleSuccessPopupVisibility() {
    setSuccessPopupVisibility(true);
  };
  function handleFailPopupVisibility() {
    setFailPopupVisibility(true);
  };

  function handleUpdateUser(data) {
    api.updateUserInfo(JSON.stringify(data))
      .then(data => {
        setCurrentUserInfo(data);
        closeAllPopups();
      }
      )
      .catch(err => alert(err))
  };

  function handleUpdateAvatar(data) {
    api.updateUserPhoto(JSON.stringify(data))
      .then(data => {
        setCurrentUserInfo(data);
        closeAllPopups();
      }
      )
      .catch(err => alert(err))
  };

  function handleAddNewPlace(data) {
    api.addNewCard(JSON.stringify(data))
      .then((data) => {
        setCards([data, ...cards])
        closeAllPopups();
      })
      .catch(err => alert(err))
  };

  function closeAllPopups() {
    handleAddPopupVisibility(false);
    handleEditPopupVisibility(false);
    handleAvatarPopupVisibility(false);
    handleDeleteVisibility(false);
    setSuccessPopupVisibility(false);
    setFailPopupVisibility(false);
    setSelectedCard({ link: '', name: '' })
  };

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="App">
        <Switch>
          <ProtectedRoute loggedIn={loggedIn} component={Main} exact path="/"
            onEditProfile={handleEditProfileClick} onAddPlace={handleAddPlaceClick} onEditAvatar={handleEditAvatarClick}
            onDeleteCard={handleDeleteClick} onCardClick={handleCardClick} cards={cards}
            onCardLike={handleCardLike} onCardDelete={handleDeleteCard} onSignOut={onSignOut} headerMail={headerMail}>
            <Footer />
          </ProtectedRoute>
          <Route path="/signin">
            <Login onLogin={onLogin} email={email} emailInput={emailInput} password={password} passwordInput={passwordInput} history={history} />
          </Route >
          <Route path="/signup">
            <Register onRegister={onRegister} history={history} />
          </Route>
        </Switch>
        <EditProfilePopup isopen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isshort={false} />
        <AddPlacePopup isshort={false} isopen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddNewPlace} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isopen={isEditAvatarPopupOpen} onClose={closeAllPopups} isshort={true} />
        <PopupWithForm title='Вы уверены?' isshort={true} button='Да' name='delete' isopen={isDeletePopupOpen} onClose={closeAllPopups}>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        <PopupSuccess isopen={isSuccessPopupOpen} onClose={closeAllPopups}/>
        <PopupFail isopen={isFailPopupOpen} onClose={closeAllPopups}/>
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
