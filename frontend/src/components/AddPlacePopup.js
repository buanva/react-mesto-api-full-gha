import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react'; 

function AddPlacePopup({ isOpen, onClose, onAddPlace }) {

    const nameInputRef = useRef();
    const linkInputRef = useRef();

    function handleSubmit() {      
        onAddPlace(nameInputRef.current.value, linkInputRef.current.value);
        nameInputRef.current.value = '';
        linkInputRef.current.value = '';
    }

    return(
        <PopupWithForm name='add-new-card' title='Новое место' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Создать'>
          <input id="title-input" className="popup__item popup__item_info_title" type="text" placeholder="Название" name="title" minLength="2" maxLength="30" required ref={nameInputRef} />
          <span className="popup__item-error title-input-error"></span>
          <input id="link-input" className="popup__item popup__item_info_link" type="url" placeholder="Ссылка на картинку" name="link" required ref={linkInputRef} />
          <span className="popup__item-error link-input-error"></span>
        </PopupWithForm>
    )
}

export default AddPlacePopup;
