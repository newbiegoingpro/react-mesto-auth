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
import auth from '../utils/auth';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import { Route, Switch, Redirect, withRouter, useHistory } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import Register from './Register';
import Login from './Login';
import InfoTooltip from './InfoTooltip';
import imgSuccess from '../images/Union.svg';
import imgFail from '../images/UnionFail.svg';
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
  const [isOpen, setInfoTooltipVisibility] = React.useState(false);
  const [isSuccessful, setRegistrationResult] = React.useState(false);

  React.useEffect(() => {
    api.getUserInfo()
      .then(data => {
        setCurrentUserInfo(data)
      })
      .catch(err => alert(err));
    api.getInitialCards()
      .then(data => setCards(data))
      .catch(err => alert(err));

    tokenCheck()    
  }, [])


  function onLogin({ email, password }) {
    auth.onLogin({ email, password })
      .then((data) => {
        localStorage.setItem('token', data.token)
        emailInput('');
        passwordInput('');
        handleLogin();
        history.push('/');
        setMail(email)
      }).catch(err => alert(err))
  }

  function onRegister({ email, password }) {
    auth.onRegister({ email, password })
      .then((data) => {
        setRegistrationResult(true)
        setInfoTooltipVisibility(true)
        history.push('/signin')
      }).catch((err) => {
        setInfoTooltipVisibility(true)
        setRegistrationResult(false)
      })

  }

  function onSignOut() {
    localStorage.removeItem('token');
    setMail('');
    history.push('/signin');
  }

  function tokenCheck() {
    const token = localStorage.getItem('token');
    if (token) {
      auth.tokenCheck(token)
        .then((data) => {
          if (data) {
            console.log(data.email)
            setMail(data.email)
            handleLogin();
            history.push('/')
          }
        }).catch(err => alert(111))
    }
  }

  function handleLogin() {
    isLoggedIn(true);
  };

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i === currentUser._id);
    api.changeLikeCardStatus(card._id, !isLiked)
      .then((newCard) => {
        setCards((state) => state.map((c) => c.likes === card._id ? newCard : c));
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
  // function handleSuccessPopupVisibility() {
  //   setSuccessPopupVisibility(true);
  // };
  // function handleFailPopupVisibility() {
  //   setFailPopupVisibility(true);
  //};

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
    setInfoTooltipVisibility(false)
    // setSuccessPopupVisibility(false);
    // setFailPopupVisibility(false);
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

          </ProtectedRoute>
          <Route path="/signin">
            <Login onLogin={onLogin} email={email} emailInput={emailInput} password={password} passwordInput={passwordInput} history={history} />
          </Route >
          <Route path="/signup">
            <Register onRegister={onRegister} history={history} />
          </Route>
        </Switch>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onUpdateUser={handleUpdateUser} onClose={closeAllPopups} isShort={false} />
        <AddPlacePopup isShort={false} isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddNewCard={handleAddNewPlace} />
        <EditAvatarPopup onUpdateAvatar={handleUpdateAvatar} isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} isShort={true} />
        <PopupWithForm title='Вы уверены?' isShort={true} button='Да' name='delete' isOpen={isDeletePopupOpen} onClose={closeAllPopups}>
        </PopupWithForm>
        <ImagePopup card={selectedCard} onClose={closeAllPopups} />
        
        <InfoTooltip isOpen={isOpen} isSuccessful={isSuccessful} onClose={closeAllPopups} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
