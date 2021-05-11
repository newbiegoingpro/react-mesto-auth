import {Link} from 'react-router-dom';
function Menu(props) {
    return (                            
        <div className={` header__menu  ${props.isopen ? 'header__menu_active' : ' '}`} >
            <p className="header__email">{props.email}</p>
            <Link className="header__link"  onClick={props.onSignOut}>Выйти</Link>
        </div>
    )
}
export default Menu;