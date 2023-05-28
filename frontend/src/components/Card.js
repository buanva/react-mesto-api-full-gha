import { useContext } from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Card({ card, onCardClick, onCardLike, onCardDelete }) {

    const currentUser = useContext(CurrentUserContext);
    const isOwn = card.owner._id === currentUser._id;
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    const cardLikeButtonClassName = ( 
        `elements__button-like ${isLiked ? 'elements__button-like_active' : ''}`
    );

    function handleLikeClick() {
        onCardLike(card)
    }

    function handleDeleteClick() {
        onCardDelete(card)
    }

    return (
        <li className="elements__item">
            {isOwn && <button className="elements__button-delete" type="button" aria-label="delete-button" onClick={handleDeleteClick}></button>}
            <div className="elements__image" style={{backgroundImage: `url(${card.link})`}} onClick={() => {
                onCardClick(card)
            }}></div>
            <div className="elements__container">
                <h2 className="elements__title">{card.name}</h2>
                <div className="elements__like-container">
                    <button className={cardLikeButtonClassName} type="button" aria-label="like-button" onClick={handleLikeClick}></button>
                    <p className="elements__like-counter">{card.likes.length}</p>
                </div>
            </div>
        </li>
    );
}

export default Card;