import React from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'

import Header from './Header.js'
import Main from './Main.js'
import Footer from './Footer.js'

import EditProfilePopup from './EditProfilePopup.js'
import AddPlacePopup from './AddPlacePopup.js'
import EditAvatarPopup from './EditAvatarPopup.js'
import ImagePopup from './ImagePopup.js'

import Register from './Register.js'
import Login from './Login.js'
import ProtectedRoute from './ProtectedRoute.js'
import InfoTooltip from './InfoTooltip.js'
import * as auth from '../utils/auth'

import {CurrentUserContext} from '../contexts/CurrentUserContext.js'
import api from '../utils/аpi'

function App() {
    const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
    const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
    const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
    const [isInfoTooltipOpen, setIsInfoTooltipOpen] = React.useState(false)
    const [selectedCard, setCardSelected] = React.useState(null)
    const [currentUser, setCurrentUser] = React.useState('') // стейт переменная принимает данные пользователя
    const [cards, setCards] = React.useState([])
    const [loggedIn, setIsLoggedIn] = React.useState(false) // состояние пользователя авторизации
    const [userData, setUserData] = React.useState({})
    const history = useHistory()

    // запрашиваем данные пользователя с сервера
    React.useEffect(() => {
        api.getUserInfo()
        .then(res => {
            setCurrentUser(res)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // запрашиваем массив карточек с сервера
    React.useEffect(() => {
        api.getInitialCards()
        .then(initialCards => {
            setCards(initialCards)
        })
        .catch((err) => {
            console.log(err)
        })
    }, [])

    // функция обновляет данные пользователя
    function handleUpdateUser(newUser) {
        api.sendUserInfo(newUser)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // функция отвечает за изменение аватара пользователя
    function handleUpdateAvatar(newAvatar) {
        api.sendUserAvatar(newAvatar)
        .then(res => {
            setCurrentUser(res)
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // функция отправки новой карточки на сервер
    function handleAddPlace(newCard) {
        api.postNewCard(newCard)
        .then(res => {
            setCards([res, ...cards])
            closeAllPopups()
        })
        .catch((err) => {
            console.log(err)
        })
    }

    // функция отрисовки лайка
    function handleCardLike(card) {
        // проверяем, есть ли уже лайк на этой карточке
        const isLiked = card.likes.some(i => i._id === currentUser._id)
        // отправляем запрос на сервер и получаем обновлённые данные карточки
        api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
            // формируем новый массив на основе имеющегося, подставляя в него новую карточку
            const newCards = cards.map((c) => c._id === card._id ? newCard : c)
            // обновляем стейт
            setCards(newCards)
        })
    }

    // функция удаления карточки
    function handleCardDelete(card) {
        // проверяем карточку, добавлена ли она текущем пользователем
        const isDeletable = card.owner._id === currentUser._id

        if (isDeletable) {
            api.deleteCard(card._id)
            .then((res) => {
                const newCards = cards.filter((c) => c._id !== card._id)
                setCards(newCards)
            })
            .catch((err) => {
                console.log(err)
            })
        }
    }
    
    // функция открытия попапа профиля
    function handleEditProfileClick() {
        setIsEditProfilePopupOpen(true)
    }

    // функция открытия попапа аватара
    function handleEditAvatarClick() {
        setIsEditAvatarPopupOpen(true)
    }

    // функция открытия попапа добавления карточки
    function handleAddPlaceClick() {
        setIsAddPlacePopupOpen(true)
    }

    // функция открытия попапа фото
    function handleCardClick(card) {
        setCardSelected(card)
    }

    // функция открытия попапа при регистрации
    function handleInfoTooltipOpen() {
        setIsInfoTooltipOpen(true)
    }

    // функция закрытия попапов
    function closeAllPopups() {
        setIsEditProfilePopupOpen(false)
        setIsEditAvatarPopupOpen(false)
        setIsAddPlacePopupOpen(false)
        setIsInfoTooltipOpen(false)
        setCardSelected()
    }

    // функция закрытия попапа по оверлею
    function closingPopupsByOverlay(evt) {
        if (evt.target !== evt.currentTarget) {
            return
        } 
        closeAllPopups()
    }

    // авторизация
    function handleLoggedIn(email, password) {
        auth.authorize(email, password)
        .then((data) => {
            if (data.token) {
                setIsLoggedIn(true)
                history.push('/')
                handleInfoTooltipOpen()
            } 
        })
        .catch(() => {
            handleInfoTooltipOpen()
        })
    }
    
    // регистрация
    function handleRegister(email, password) {
        auth.register(email, password)
        .then((res) => {
            if (res) {
                history.push('/sign-in')
            }
        })
        .catch((err) => console.log(err))
    }

    function handleLoggedOut() {
        setIsLoggedIn(false)
    }

    function tokenCheck() {
        if (localStorage.getItem('jwt')) {
            const jwt = localStorage.getItem('jwt')  
            auth.getContent(jwt)
            .then((res) => {
                if (res) {
                    setUserData(res.data)
                    setIsLoggedIn(true)
                    history.push('/')
                }
            })
            .catch((err) => console.log(err))
        }  
    }

    // проверка токена
     React.useEffect(() => {
        tokenCheck()
    }, [])

    // возвращаем разметку страницы, которую добавляем в DOM
    return (
        <div className="page">
            <CurrentUserContext.Provider value={currentUser}>
                <Header
                    userData = {userData}
                    handleLoggedOut = {handleLoggedOut}
                />
                <Switch>
                    <ProtectedRoute exact path="/" loggedIn={loggedIn} component={Main} 
                        onEditProfile = {handleEditProfileClick}
                        onEditAvatar = {handleEditAvatarClick}
                        onAddPlace = {handleAddPlaceClick}
                        onCardClick = {handleCardClick}
                        cards = {cards}
                        onCardLike = {handleCardLike}
                        onCardDelete = {handleCardDelete}
                    />
                    <Route path="/sign-in">
                        <Login
                            handleLoggedIn = {handleLoggedIn}
                            handleInfoTooltipOpen = {handleInfoTooltipOpen}
                        />
                    </Route>
                    <Route path="/sign-up">
                        <Register
                            handleRegister={handleRegister}
                        />
                    </Route>
                </Switch>

                <Footer />

                <EditProfilePopup
                    isOpen={isEditProfilePopupOpen}
                    onClose={closeAllPopups}
                    onCloseByOverlay = {closingPopupsByOverlay}
                    onUpdateUser = {handleUpdateUser}
                />
                <EditAvatarPopup
                    isOpen = {isEditAvatarPopupOpen}
                    onClose = {closeAllPopups}
                    onCloseByOverlay = {closingPopupsByOverlay}
                    onUpdateAvatar = {handleUpdateAvatar}
                />
                <AddPlacePopup
                    isOpen = {isAddPlacePopupOpen}
                    onClose = {closeAllPopups}
                    onCloseByOverlay = {closingPopupsByOverlay}
                    onAddPlace = {handleAddPlace}
                />
                <ImagePopup
                    card = {selectedCard}
                    onClose = {closeAllPopups}
                    onCloseByOverlay = {closingPopupsByOverlay}
                />

                <InfoTooltip
                    loggedIn={loggedIn}
                    isOpen = {isInfoTooltipOpen}
                    onClose = {closeAllPopups}
                    onCloseByOverlay = {closingPopupsByOverlay}
                />

            </CurrentUserContext.Provider>
        </div>
    )
}

export default App
