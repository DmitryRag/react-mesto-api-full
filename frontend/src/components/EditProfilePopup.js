import React from 'react'
import PopupWithForm from './PopupWithForm.js'
import {CurrentUserContext} from '../contexts/CurrentUserContext.js'

function EditProfilePopup(props) {

    const currentUser = React.useContext(CurrentUserContext)

    const [name, setName] = React.useState('')
    const [description, setDescription] = React.useState('')

    React.useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
    }, [currentUser])

    function handleNameChange(e) {
        setName(e.target.value)
    }

    function handleDescriptionChange(e) {
        setDescription(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onUpdateUser({
            name: name,
            about: description
        })
    }

    return(
        <PopupWithForm
            name = 'edit'
            title = 'Редактировать профиль'
            btnText = 'Сохранить'
            isOpen = {props.isOpen}
            onClose = {props.onClose}
            onCloseByOverlay = {props.onCloseByOverlay}
            onSubmit = {handleSubmit}>
                <input id="name-input" type="text" className="popup__input popup__input_el_name" name="user-name" value={name ? name : ''} onChange={handleNameChange} placeholder="Имя" required minLength="2" maxLength="40" />
                <span id="name-input-error" className="popup__input-error"></span>
                <input id="job-input" type="text" className="popup__input popup__input_el_job" name="user-job" value={description ? description : ''} onChange={handleDescriptionChange} placeholder="О себе" required minLength="2" maxLength="200" />
                <span id="job-input-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup