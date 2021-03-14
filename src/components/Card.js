import trashCan from '../images/TrashSvg.svg';

function Card(props){

    

    function handleClick() {
        props.onCardClick(props.card);
      }  
      
    return (
        <div className="gallery__item" >
            <img className="gallery__pic" onClick={handleClick} src={props.card.link} alt="Изображение" />
            <button className="gallery__delete-button" type="button">
                <img className="gallery__delete-button-pic"  src={trashCan} alt='Удалить' onClick={props.onDeleteCard}/>
            </button>
            <div className="gallery__text-container">
                <p className="gallery__text">{props.card.name}</p>
                <div className="gallery__like-container">
                <button className="gallery__like-button" type="button">
                </button>
                <p className="gallery__like-counter">{props.card.likes.length}</p>
                </div>
            </div>
        </div>
        )
}

export default Card