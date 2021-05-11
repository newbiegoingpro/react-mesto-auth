import add from '../images/add-button.svg';
function InfoTooltip(props) {
    return (
        <div className= {` infoTooltip ${props.isopen ? 'infoTooltip_visible' : ' '} `}>
            <div className='infoTooltip__container'>
                <button type="button" className="popup__close-button register__close-button" onClick={props.onClose} onClick={props.onClose}>
                    <img className="popup__close-button-image" src={add} alt="Крестик" />
                </button>

                {props.children}

            </div>

        </div>
    )
}

export default InfoTooltip;