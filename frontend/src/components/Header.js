import React from 'react'
import { Switch, Route, Link } from 'react-router-dom'
import logo from '../images/mesto__logo.svg'

function Header(props) {
    function signOut() {
        localStorage.removeItem('token');
        props.handleLoggedOut();
    }

    return(
        <header className="header">
            <img src={logo} alt="Логотип проекта Mesto" className="header__logo" />
            <Switch>
                <Route exact path="/">
                    <div className="header__info-container">
                        <p className="header__account">{props.email}</p>
                        <Link to="/sign-up" className="header__link" onClick={signOut}>Выйти</Link>
                    </div>
                </Route>
                <Route path="/sign-up">
                    <Link to="/sign-in" className="header__link">Войти</Link>
                </Route>
                <Route path="/sign-in">
                    <Link to="/sign-up" className="header__link">Регистрация</Link>
                </Route>
            </Switch>
        </header>
    )
}

export default Header