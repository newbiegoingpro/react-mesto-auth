
import add from '../images/add-button.svg';
function ImagePopup(props) {



    return (
        <div className={`popup closeupPopup ${(props.card.link.length > 1) ? 'popup_opened' : ' '}`} >
            <div className='closeupPopup__container'>
                <button className='popup__close-button closeupPopup__close-button' type="button" onClick={props.onClose}>
                    <img className="popup__close-button-image" src={add} alt="Крестик" />
                </button>
                <img className='closeupPopup__pic' src={props.card.link} 
                alt='Изображение, добавленнное пользователем сервиса' />
                <p className="closeupPopup__text">
                    {props.card.name}
                </p>
            </div>
        </div>
    )
}
export default ImagePopup