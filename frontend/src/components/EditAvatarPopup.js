import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function EditAvatarPopup(props) {

    const inputRef = React.useRef()

    function handleSubmit(e) {
        e.preventDefault()
    
        props.onUpdateAvatar({
            avatar: inputRef.current.value
        })
    }

    React.useEffect(() => {
        inputRef.current.value = ""
    }, [props.isOpen])

    return(
        <PopupWithForm
            name = 'avatar'
            title = 'Обновить аватар'
            btnText = 'Сохранить'
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onCloseByOverlay = {props.closingPopupsByOverlay}
            onSubmit = {handleSubmit}>
                <input ref={inputRef} id="user-avatar-input" type="url" className="popup__input popup__input_el_user-avatar" name="user-avatar" placeholder="Ссылка на картинку" required />
                <span id="user-avatar-input-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup