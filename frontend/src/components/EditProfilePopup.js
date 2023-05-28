import { useState, useEffect, useContext } from 'react'; 
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function EditProfilePopup({ isOpen, onClose, onUpdateUser }) {

    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const currentUser = useContext(CurrentUserContext);

    useEffect(() => {
        setName(currentUser.name);
        setDescription(currentUser.about);
      }, [currentUser, isOpen]);

    function handleChangeName(e) {
        setName(e.target.value)
    }

    function handleChangeDescription(e) {
        setDescription(e.target.value)
    }

    function handleSubmit() {      
        onUpdateUser({
          name,
          about: description,
        });
    }

    return(
        <PopupWithForm name='popup-edit-profile' title='Редактировать профиль' isOpen={isOpen} onClose={onClose} onSubmit={handleSubmit} buttonText='Сохранить'>
            <input id="name-input" className="popup__item popup__item_info_name" type="text" placeholder="Имя" name="name" minLength="2" maxLength="40" required onChange={handleChangeName} value={name} />
            <span className="popup__item-error name-input-error"></span>
            <input id="about-input" className="popup__item popup__item_info_about" type="text" placeholder="О себе" name="about" minLength="2" maxLength="200" required onChange={handleChangeDescription} value={description} />
            <span className="popup__item-error about-input-error"></span>
        </PopupWithForm>
    )
}

export default EditProfilePopup;
