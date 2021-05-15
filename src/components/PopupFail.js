import InfoTooltip from './InfoTooltip';
import imgFail from '../images/UnionFail.svg';
function PopupFail(props) {
    return (
        <InfoTooltip onClose={props.onClose} isopen={props.isopen}>
            <img className="infoTooltip__image" src={ imgFail } />

            <h1 className='infoTooltip__text'>Что-то пошло не так!
            Попробуйте ещё раз.</h1>
        </InfoTooltip>
    )
}
export default PopupFail;