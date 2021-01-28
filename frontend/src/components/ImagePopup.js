import React from 'react'

function ImagePopup(props) {
    return(
        <section className={`popup popup_type_view ${props.card && 'popup_opened'}`} onClick={props.onCloseByOverlay}>
                <div className="popup__container popup__container_type_view">
                    <button className="popup__close-button popup__close-button_type_view button" type="button" onClick={props.onClose}></button>
                    {props.card && <img alt="Картинка из галлереи Mesto" className="popup__photo" src={props.card.link} />}
                    {props.card && <p className="popup__photo-caption">{props.card.name}</p>}
                </div>
        </section>
    )
}

export default ImagePopup