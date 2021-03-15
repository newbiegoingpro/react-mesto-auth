import avatar from '../images/kusto.jpg';
import edit from '../images/edit-button.svg';
import api from '../utils/Api'
import React from 'react';
import Card from '../components/Card';

function Main(props) {
    const [userName, setUserName] = React.useState('')
    const [userDescription, setUserDescription] = React.useState('')
    const [userAvatar, setUserAvatar] = React.useState('')
    const [cards, setCards] = React.useState([])
    React.useEffect(() => {
        api.getUserInfo()
            .then(data => {
                setUserName(data.name)
                setUserDescription(data.about)
                setUserAvatar(data.avatar)
            })
            .catch(err => alert(err))
        api.getInitialCards()
            .then(data => setCards(data))
            .catch(err => alert(err))
    }, [])

    return (
        <div className='main'>

            <section className='profile'>
                <div className="profile__avatar-container">
                    <img className='profile__avatar' src={userAvatar} alt='Аватар пользователя' />
                    <button className="profile__avatar-button" type="button" onClick={props.onEditAvatar}>
                        <img className="profile__avatar-button-pic" src={edit} alt='Кнопка редактирования аватара' />
                    </button>
                </div>
                <div className='profile__info'>
                    <div className="profile__info-container">
                        <h1 className="profile__name">{userName}</h1>
                        <button className="profile__edit-button" type="button" onClick={props.onEditProfile}>
                        </button>
                    </div>
                    <p className='profile__profession'>{userDescription}</p>
                </div>
                <button className="profile__add-button" type="button" onClick={props.onAddPlace}>
                </button>
            </section>

            <section className='gallery'>

                {cards.map((card) => (
                    <Card key={card._id} onDeleteCard={props.onDeleteCard} onCardClick={props.onCardClick} card={card} />))}

            </section>

        </div>
    )

}
export default Main