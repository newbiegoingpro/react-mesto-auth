import InfoTooltip from './InfoTooltip';
import imgSuccess from '../images/Union.svg';
function PopupSuccess(props) {
    return (
        <InfoTooltip onClose={props.onClose} isopen={props.isopen}>
            <img className="infoTooltip__image" src={imgSuccess} />

            <h1 className='infoTooltip__text'>Вы успешно зарегистрировались!</h1>
        </InfoTooltip>
    )
}
export default PopupSuccess;