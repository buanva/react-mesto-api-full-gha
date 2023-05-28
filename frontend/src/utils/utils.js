import { newCardPopupForm } from './constants.js';
import Card from '../components/Card.js';
import {
    rewriteParamsViewImagePopup,
    popupDeleteCard,
    handleUserInfo,
    api
} from '../pages/index.js';

export function clearNewCardPopup() {
    newCardPopupForm.reset();
};

export function createCard(data) {
    const card = new Card(data, '#elements__item-template', handleImageViewPopup, openPopupDeleteCard, handleLike, handleUserInfo.getUserInfo().id);
    return card.generateCard();
};

export function handleImageViewPopup(title, image) {
    rewriteParamsViewImagePopup.open(title, image);
};

function openPopupDeleteCard(cardId, callback) {
    popupDeleteCard.open(() => {
        api.requestDeleteCard(cardId)
        .then(() => {
            callback()
        })
        .catch(err => console.error('Что-то пошло не так', err));
    });
}

export function handleLike(like, cardId, callback) {
    api.requestLikeAction(like, cardId)
    .then((res) => {
        callback(res.likes)
    })
    .catch(err => console.error('Что-то пошло не так', err));
}
