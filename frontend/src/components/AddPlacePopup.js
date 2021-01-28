import React from 'react'
import PopupWithForm from './PopupWithForm.js'

function AddPlacePopup(props) {

    const [placeName, setPlaceName] = React.useState('')
    const [placeUrl, setPlaceUrl] = React.useState('')

    function handlePlaceNameChange(e) {
        setPlaceName(e.target.value)
    }

    function handlePlaceUrlChange(e) {
        setPlaceUrl(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault()

        props.onAddPlace({
            name: placeName,
            link: placeUrl
        })
    }

    React.useEffect(() => {
        setPlaceName("")
        setPlaceUrl("")
    }, [props.isOpen])

    return(
        <PopupWithForm
                name = 'add'
                title = 'Новое место'
                btnText = 'Создать'
                isOpen = {props.isOpen}
                onClose = {props.onClose}
                onCloseByOverlay = {props.onCloseByOverlay}
                onSubmit = {handleSubmit}>
                    <input id="place-name-input" type="text" className="popup__input popup__input_el_place-name" name="place-name" value={placeName} onChange={handlePlaceNameChange} placeholder="Название" required minLength="1" maxLength="30" />
                    <span id="place-name-input-error" className="popup__input-error"></span>
                    <input id="place-url-input" type="url" className="popup__input popup__input_el_place-url" name="place-url" value={placeUrl} onChange={handlePlaceUrlChange} placeholder="Ссылка на картинку" required />
                    <span id="place-url-input-error" className="popup__input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup