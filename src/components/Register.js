import { Link, Redirect } from 'react-router-dom'; 
import Header from './Header';
import React from 'react';
function Register(props) {
    
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');
    function handleEmailInput(e){
        emailInput(e.target.value)
    }
    function handlePasswordInput(e){
        passwordInput(e.target.value)
    }
    function handleSubmit(e){
        e.preventDefault();
        props.onRegister({ email, password })
    }
    return (
        <>
        <Header headerState='Войти' headerDirection="/signin" />
        <div className="register">

            <form onSubmit={handleSubmit} className="register__form">
                <p className="register__heading">Регистрация</p>
                <input className="register__input" placeholder="Email" required type="email" value={email} onChange={handleEmailInput}  />

                <input className="register__input" placeholder="Пароль" required type="password" value={password} onChange={handlePasswordInput}  />
                <div className="register__button-container">
                    <button type="submit" /*onSubmit={this.handleSubmit} */ className="register__link">Зарегистрироваться</button>
                </div>
            </form>
            <div className="register__signin">
                <p>Уже зарегистрированы?</p>
                <Link to="/signin" className="register__signin-link">Войти
                </Link>
            </div>
        </div>
        </>
    )
}

export default Register;