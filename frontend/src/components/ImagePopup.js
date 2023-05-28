import React from "react";

function ImagePopup({ card, onClose }) {
    return (

        <div className={`popup popup_opacity popup_view-image ${card ? 'popup_opened' : ''}`} onMouseDown={evt => {
            if (evt.target.classList.contains('popup'))
                onClose()
        }}>
            <figure className="popup__figure-container">
                <button className="popup__close-button" onClick={onClose} type="button" aria-label="close-button"></button>
                <img className="popup__image" alt={`${card ? card.name : ''}`} src={`${card ? card.link : ''}`} />
                <figcaption className="popup__caption">{`${card ? card.name : ''}`}</figcaption>
            </figure>
        </div>

    );
}

export default ImagePopup;