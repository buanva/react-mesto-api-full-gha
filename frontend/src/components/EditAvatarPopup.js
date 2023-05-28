import PopupWithForm from "./PopupWithForm";
import { useRef } from 'react'; 

function EditAvatarPopup({ isOpen, onClose, onUpdateAvatar }) {

    const avatarRef = useRef();

    function handleSubmit() {      
        onUpdateAvatar(avatarRef.current.value);
        avatarRef.current.value = '';
    }

    return(
        <PopupWithForm name='update-avatar' title='Обновить аватар' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
          <input id="avatar-input" className="popup__item popup__item_info_link" type="url" placeholder="Ссылка" name="link" required ref={avatarRef} />
          <span className="popup__item-error avatar-input-error"></span>
        </PopupWithForm>
    )
}

export default EditAvatarPopup;
