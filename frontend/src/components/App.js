import { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import ProtectedRouteElement from './ProtectedRoute';
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import ImagePopup from "./ImagePopup";
import Login from './Login';
import Register from './Register';
import InfoTooltip from './InfoTooltip';
import { api } from "../utils/api";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function App() {

  const [isEditAvatarPopupOpen, setIsEditAvatarPopup] = useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopup] = useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopup] = useState(false);
  const [isInfoTooltipOpen, setIsInfoTooltip] = useState(false);
  const [isAuthRequestSuccess, setIsAuthRequestSuccess] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  const [cards, setCards] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {

    function closeByEscape(evt) {
      if (evt.key === 'Escape') {
        closeAllPopups();
      };
    };

    document.addEventListener('keydown', closeByEscape);

    return () => {
      document.removeEventListener('keydown', closeByEscape);
    }
  })

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then(changeUserProfile)
        .catch((err) => console.error('getUserInfo', err));

      api.getCards()
        .then(setCards)
        .catch((err) => console.error('getCards', err));
    }
  }, [loggedIn])

  useEffect(() => {
    const isLogged = localStorage.getItem('isLogged');
    if (isLogged) {
      api.getUserInfo()
        .then(({ _id, email }) => {
          setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, _id, email } });
          setLoggedIn(true);
          navigate('/', { replace: true })
        })
        .catch((err) => console.error('api.getUserInfo', err));
    }
  }, [])

  function changeUserProfile({ name, about, avatar, _id }) {
    setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, name, about, avatar, _id } });
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopup(!isEditAvatarPopupOpen);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopup(!isEditProfilePopupOpen);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopup(!isAddPlacePopupOpen);
  }

  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function closeAllPopups() {
    [setIsEditAvatarPopup, setIsEditProfilePopup, setIsAddPlacePopup, setIsInfoTooltip].forEach(handler => handler(false));
    setSelectedCard(null);
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    api.requestLikeAction(isLiked, card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
      })
      .catch((err) => console.error('handleCardLike', err));
  }

  function handleCardDelete(card) {
    api.requestDeleteCard(card._id)
      .then(() => {
        setCards((state) => state.filter((c) => c._id !== card._id));
      })
      .catch((err) => console.error('handleCardDelete', err));
  }

  function handleUpdateUser(userInfo) {
    api.editProfile(userInfo)
      .then(({ name, about }) => {
        setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, name, about } });
        closeAllPopups();
      })
      .catch((err) => console.error('handleUpdateUser', err))
  }

  function handleUpdateAvatar(link) {
    api.editAvatar(link)
      .then(({ avatar }) => {
        setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, avatar } });
        closeAllPopups();
      })
      .catch((err) => console.error('handleUpdateAvatar', err))
  }

  function handleAddPlaceSubmit(name, link) {
    api.addNewCard(name, link)
      .then((newCard) => {
        setCards([newCard, ...cards]);
        closeAllPopups();
      })
      .catch((err) => console.error('handleAddPlaceSubmit', err))
  }

  function handleInfoTooltipOpen(success) {
    setIsAuthRequestSuccess(success);
    setIsInfoTooltip(true);
  }

  function handleRegister(dataAuth) {
    api.register(dataAuth)
      .then(({ email }) => {
        setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, email } });
        handleInfoTooltipOpen(true);
        navigate('/sign-in', { replace: true });
      })
      .catch((err) => {
        console.error('handleRegister', err);
        handleInfoTooltipOpen(false);
      })
  }

  function handleLogin(dataAuth) {
    api.login(dataAuth)
      .then(({ email }) => {
        setCurrentUser((oldUserInfo) => { return { ...oldUserInfo, email } });
        localStorage.setItem('isLogged', true);
        setLoggedIn(true);
        navigate('/', { replace: true });
      })
      .catch((err) => {
        console.error('handleLogin', err);
        handleInfoTooltipOpen(false);
      })
  }

  function exit() {
    localStorage.removeItem('isLogged');
    setLoggedIn(false);
    setCurrentUser({});
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="page">
        <Header loggedIn={loggedIn} email={currentUser.email} onExit={exit} />
        <Routes>
          <Route path="/"
            element={
              <ProtectedRouteElement
                element={Main}
                loggedIn={loggedIn}
                cards={cards}
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onCardClick={handleCardClick}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            }
          />
          <Route path="/sign-up" element={<Register onRegister={handleRegister} />} />
          <Route path="/sign-in" element={<Login onLogin={handleLogin} />} />
        </Routes>
        {loggedIn && <Footer />}
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
        <ImagePopup
          card={selectedCard}
          onClose={closeAllPopups}
        />
        <InfoTooltip isOpen={isInfoTooltipOpen} onClose={closeAllPopups} isSuccess={isAuthRequestSuccess} />
      </div>
    </CurrentUserContext.Provider>
  );
}

export default App;
