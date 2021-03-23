
import add from '../images/add-button.svg';
function PopupWithForm(props) {
    return (
        <form className={`form popup popup-${props.name}  ${props.isopen ? 'popup_opened' : ' '}`} name={`${props.name}`} onSubmit={props.onSubmit} noValidate>
            <div className={`popup__container ${props.isshort ? 'popup__container_short' : ' '}`}>
                <button type="button" className="popup__close-button popup-add__close-button" onClick={props.onClose}>
                    <img className="popup__close-button-image" src={add} alt="Крестик" />
                </button>
                <h2 className="popup__heading">
                    {props.title}
                </h2>

                {props.children}

                <button type="submit" value="Сохранить" className="popup__submit popup__save-button popup-add__save-button">
                    {props.button}
                </button>
            </div>
        </form>
    )
}
export default PopupWithForm