import React from "react";

function InfoTooltip(props) {

    return (
        <div className={`popup popup_${props.name} ${props.isOpen ? 'popup_opened' : ''}`} onMouseDown={evt => {
            if (evt.target.classList.contains('popup'))
                props.onClose()
        }}>
            <div className="popup__form-wrapper popup__container popup__container_padding">
                <button className="popup__close-button" onClick={props.onClose} type="button" aria-label="close-button"></button>
                <div className={`popup__img popup__img_type-${props.isSuccess ? 'success' : 'fail'}`}></div>
                <p className="popup__title popup__title_info-tooltip">{
                    props.isSuccess ?
                        'Вы успешно зарегистрировались!' :
                        'Что-то пошло не так! Попробуйте ещё раз.'
                }</p>
            </div>
        </div>
    );
}

export default InfoTooltip;