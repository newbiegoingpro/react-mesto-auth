import trashCan from '../images/TrashSvg.svg';
import {CurrentUserContext} from '../contexts/CurrentUserContext';
import React from 'react';

function Card(props) {
    function handleClick() {
        props.onCardClick(props.card);
    }
    function handleLikeClick() {
        props.onCardLike(props.card);
    }
    function handleDeleteClick() {
        props.onDeleteCard(props.card);
    }
    const currentUser = React.useContext(CurrentUserContext);
    const isMine = props.card.owner === currentUser._id;
    const isLiked = props.card.likes.some((i) => i === currentUser._id);

    return (
        <div className="gallery__item" >
            <img className="gallery__pic" onClick={handleClick} src={props.card.link} alt={props.card.name} />
            <button className={`${isMine ? `gallery__delete-button` : `gallery__delete-button_hidden`}`} type="button">
                <img className="gallery__delete-button-pic" src={trashCan} alt='Удалить' onClick={handleDeleteClick} />
            </button>
            <div className="gallery__text-container">
                <p className="gallery__text">{props.card.name}</p>
                <div className="gallery__like-container">
                    <button className={`${isLiked ? `gallery__like-button_active` : `gallery__like-button`}`} onClick={handleLikeClick} type="button">
                    </button>
                    <p className="gallery__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
    )
}

export default Card;