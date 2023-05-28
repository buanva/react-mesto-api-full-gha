import { useContext } from 'react';
import Card from './Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';

function Main(props) {

    const currentUser = useContext(CurrentUserContext);
    const cards = props.cards;

    return (
        <main className="main">

            <section className="profile">
                <div className="profile__container">
                    <div className="profile__avatar" onClick={props.onEditAvatar} style={{ backgroundImage: `url(${currentUser.avatar})` }}></div>

                    <div className="profile__info">
                        <div className="profile__info-container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" onClick={props.onEditProfile} type="button" aria-label="edit-button"></button>
                        </div>
                        <p className="profile__about-me">{currentUser.about}</p>
                    </div>
                </div>

                <button className="profile__add-button" onClick={props.onAddPlace} type="button" aria-label="add-button"></button>
            </section>

            <section className="elements">
                <ul className="elements__grid">
                    {cards.length ? cards.map((card) => (
                        <Card card={card} key={card._id} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete} />
                    )) : ""}
                </ul>
            </section>

        </main>
    )
}

export default Main;
