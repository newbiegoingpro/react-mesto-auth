import logo from '../images/Vector__White.svg'
import { Link, Route, Switch } from 'react-router-dom';
import React from 'react';
import Menu from './Menu';
import Hamburger from './Hamburger';
import add from '../images/add-button.svg';
import menuPic from '../images/white-menu-icon-12.png';
/*import { Dimensions } from 'react-native';*/
function Header(props) {
    const [isMenuOpen, handleMenuVisibility] = React.useState(false);
    const [width, measureHeaderWidth] = React.useState({ width: window.innerWidth });
    React.useEffect(() => {
        window.addEventListener('resize', checkWindowsWidth)
        return () => {
            window.removeEventListener('resize', checkWindowsWidth)
        }
    }, [width]
    )
    function checkWindowsWidth() {
        measureHeaderWidth({ width: window.innerWidth })
    }
    function handleMenuClick() {
        handleMenuVisibility(!isMenuOpen);
        console.log('react is dumb')
    }
    function getLoggedHeaderLayout() {
        if (width.width > 425) {
            return (
                <div className="header__box">
                    <p className="header__email">{props.headerMail}</p>
                    <Link className="header__link" onClick={props.onSignOut}>Выйти</Link>
                </div>
            )
        } else {
            return (
                <>
                    <Menu email={props.headerMail} onSignOut={props.onSignOut} isOpen={isMenuOpen} />
                    <img
                        className={` ${isMenuOpen ? 'header__hamburger-btn_active' : 'header__hamburger-btn'}`}
                        src={isMenuOpen ? add : menuPic} alt='кнопка меню' onClick={handleMenuClick}
                    />
                </>
            )
        }
    }
    return (
        <>

            <header className='header'>
                <img className='header__logo' src={logo} alt="Лого" />
                <Route exact path="/signup" >
                    <Link className="header__link" to='/signin'>
                        Войти
                        </Link>
                </Route>
                <Route path="/signin" >
                    <Link className="header__link" to='/signup'>
                        Регистрация
                        </Link>
                </Route>
                <Route exact path="/" >
                    {getLoggedHeaderLayout()}
                </Route>
            </header>

        </>

    )
}

export default Header;