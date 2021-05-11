import avatar from '../images/kusto.jpg';
import edit from '../images/edit-button.svg';
import api from '../utils/api'
import React from 'react';
import Card from '../components/Card';
import { CurrentUserContext } from '../contexts/CurrentUserContext';
import Header from './Header'
import Footer from './Footer'
function Main(props) {
    const currentUser = React.useContext(CurrentUserContext)




    return (
        <>
            <Header headerMail={props.headerMail} onSignOut={props.onSignOut} />
            <div className='main'>

                <section className='profile'>
                    <div className="profile__avatar-container">
                        <img className='profile__avatar' src={currentUser.avatar} alt='Аватар пользователя' />
                        <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
                            <img className="profile__avatar-button-pic" src={edit} alt='Кнопка редактирования аватара' />
                        </button>
                    </div>
                    <div className='profile__info'>
                        <div className="profile__info-container">
                            <h1 className="profile__name">{currentUser.name}</h1>
                            <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                            </button>
                        </div>
                        <p className='profile__profession'>{currentUser.about}</p>
                    </div>
                    <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                    </button>
                </section>

                <section className='gallery'>

                    {props.cards.map((card) => (
                        <Card key={card._id} onDeleteCard={props.onCardDelete} onCardClick={props.onCardClick} card={card} onCardLike={props.onCardLike} />))}

                </section>

            </div>
            <Footer />
        </>
    )

}
export default Main