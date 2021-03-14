import { render } from "@testing-library/react"
import add from '../images/add-button.svg';
function PopupWithImage(props){

   console.log(props)

    return(
        <div className={`popup closeupPopup ${props.card ? 'popup_opened' : ' '}`} >
            <div className='closeupPopup__container'>
                <button className='popup__close-button closeupPopup__close-button' type="button" onClick={props.onClose}>
                    <img className="popup__close-button-image" src={add} alt="Крестик"/>
                </button>
                <img className='closeupPopup__pic' src={props.card.link} alt='Пейзаж'/>
                <p className="closeupPopup__text">
                    {props.card.name}
                </p>
            </div>
        </div>
    )
}
export default PopupWithImage