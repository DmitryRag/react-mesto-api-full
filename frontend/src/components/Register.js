import React from 'react'
import { Link } from 'react-router-dom'

function Register(props) {
    // email и password пользователя состояние изначально пустая строка
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')

    // функция отслеживает ввод email
    function handleEmailChange(e) {
        setEmail(e.target.value)
    }

    // функция отслеживает ввод пароля
    function handlePasswordChange(e) {
        setPassword(e.target.value)
    }

    // отправка формы
    function handleSubmit(e) {
        e.preventDefault()
        props.handleRegister(email, password)
    }

    // возвращаем разметку
    return(
        <section className="login">
            <div className="login__container">
                <h2 className="login__title">Регистрация</h2>
                <form className="login__forms" noValidate>
                    <input id="login-email" type="email" className="login__input" value={email} onChange={handleEmailChange} placeholder="Email" required minLength="1" maxLength="30" />
                    <input id="login-password" type="password" className="login__input" value={password} onChange={handlePasswordChange} placeholder="Пароль" minLength="1" maxLength="30" required />
                    <button className="login__submit-button" type="submit" onClick={handleSubmit}>Зарегистрироваться</button>
                </form>
                <Link className="login__link" to="/sign-in">Уже зарегистрированы? Войти</Link>
            </div>
        </section>
    )
}

export default Register