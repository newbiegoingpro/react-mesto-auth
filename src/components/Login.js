import { Link, withRouter } from 'react-router-dom';
import Header from './Header';
import React from 'react';
function Login(props) {
    
    const [email, emailInput] = React.useState('');
    const [password, passwordInput] = React.useState('');
    function handleEmailInput(e) {
        emailInput(e.target.value)
    }
    function handlePasswordInput(e) {
        passwordInput(e.target.value)
    }

    function handleSubmit(e) {
        e.preventDefault(); 
        props.onLogin({ email, password });   
    }



    return (
        <>
            <Header headerState='Регистрация' headerDirection="/signup" />
            <div className="login">

                <form onSubmit={handleSubmit} className="login__form">
                    <p className="login__heading">Вход</p>
                    <input className="login__input" required id="E-mail"
                        name="E-mail" placeholder="Email"
                        type="email" value={email}
                        onChange={handleEmailInput} />
                    <input className="login__input" required id="password"
                        name="password" placeholder="Пароль" type="password"
                        value={password} onChange={handlePasswordInput} />
                    <div className="login__button-container">
                        <button type="submit" className="login__link">Войти</button>
                    </div>
                </form>


            </div>
        </>
    )
}

export default Login;