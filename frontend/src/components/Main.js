import React from 'react'
import Card from './Card'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'


function Main(props) {

    const currentUser = React.useContext(CurrentUserContext)

    return(
        <main className="content">
            <section className="profile">
                <div className="profile__avatar" style={{ backgroundImage: `url(${currentUser.avatar})` }}>
                    <button className="profile__avatar-edit-button" type="button" onClick={props.onEditAvatar}></button>
                </div>
                <div className="profile__info">
                    <h1 className="profile__name">{currentUser.name}</h1>
                    <button className="button profile__edit-button" type="button" onClick={props.onEditProfile}></button>
                    <p className="profile__job">{currentUser.about}</p>
                </div>
                <button className="button profile__add-button" type="button" onClick={props.onAddPlace}></button>
            </section>
            <ul className="gallery">
                {props.cards.map((card) => (
                    <Card
                    key = {card._id}
                    card = {card}
                    onCardClick={props.onCardClick} 
                    onCardLike={props.onCardLike}
                    onCardDelete={props.onCardDelete}
                    />
                )
                )}
            </ul>
        </main>
    )
}

export default Main