import React from 'react'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function Card(props) {

    const currentUser = React.useContext(CurrentUserContext)

    function handleClick() {
        props.onCardClick(props.card)
    }

    function handleLikeClick() {
        props.onCardLike(props.card)
    }

    function handleDeleteClick() {
        props.onCardDelete(props.card)
    }

    const isOwn = props.card.owner._id === currentUser._id
    const isLiked = props.card.likes.some(i => i._id === currentUser._id)

    const cardLikeButtonClassName = (
    `gallery__like-button button ${isLiked ? 'gallery__like-button_active' : ''}`)
    
    return(
        <li className="gallery__card">
            <button className="gallery__trash-button button" type="button" style={{ display: `${isOwn ? '' : 'none'}` }} onClick={handleDeleteClick}></button>
            <img className="gallery__photo" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
            <div className="gallery__info-container">
                <h2 className="gallery__photo-title">{props.card.name}</h2>
                <div className="gallery__like-container">
                    <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button"></button>
                    <p className="gallery__like-number">{props.card.likes.length}</p>
                </div>
            </div>
        </li>
    )
}

export default Card