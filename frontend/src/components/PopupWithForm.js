import React from "react";

function PopupWithForm(props) {

    function handleSubmit(e) {
        e.preventDefault();
        props.onSubmit(e);
    }

    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={evt => {
            if (evt.target.classList.contains('popup'))
                props.onClose()
        }}>
            <div className="popup__form-wrapper">
                <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="close-button"></button>
                <form className="popup__container" name={props.name} noValidate onSubmit={handleSubmit}>
                    <h2 className="popup__title">{props.title}</h2>
                    {props.children}
                    <button className="popup__save-button" type="submit">{props.buttonText}</button>
                </form>
            </div>
        </div>
    );
}

export default PopupWithForm;