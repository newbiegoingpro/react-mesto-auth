import add from '../images/add-button.svg';
import imgSuccess from '../images/Union.svg';
import imgFail from '../images/UnionFail.svg';
function InfoTooltip(props) {
    return (
        <div className= {` infoTooltip ${props.isOpen ? 'infoTooltip_visible' : ' '} `}>
            <div className='infoTooltip__container'>
                <button type="button" 
                className="popup__close-button register__close-button"
                onClick={props.onClose} onClick={props.onClose}>
                    <img className="popup__close-button-image" src={add} alt="Крестик" />
                </button>
                <img className="infoTooltip__image" src={props.isSuccessful ? imgSuccess : imgFail} />
                <h1 className='infoTooltip__text'>
                {props.isSuccessful ? 'Вы успешно зарегистрировались!' 
                : 'Что-то пошло не так! Попробуйте ещё раз.'}
                </h1>
            </div>

        </div>
    )
}

export default InfoTooltip;