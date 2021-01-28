import React from 'react'

function PopupWithForm(props) {
    return(
        <section className={`popup popup_type_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onClick={props.onCloseByOverlay}>
            <div className={`popup__container popup__container_type_${props.name}`}>
                <button className={`popup__close-button popup__close-button_type_${props.name} button`} onClick={props.onClose} type="button"></button>
                <h2 className="popup__title">{props.title}</h2>
                <form className={`popup__forms popup__forms_type_${props.name}`} name={props.name} onSubmit={props.onSubmit} noValidate>
                    {props.children}
                    <button className={`popup__submit-button popup__submit-button_type_${props.name}`} type="submit">{props.btnText}</button>
                </form>
            </div>
        </section>
    )
} 

export default PopupWithForm







