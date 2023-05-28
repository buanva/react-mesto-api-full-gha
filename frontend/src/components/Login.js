import { useState } from "react";

function Login(props) {

    const [formValue, setFormValue] = useState({
        email: '',
        password: ''
    })

    const handleChange = (e) => {
        const {name, value} = e.target;

        setFormValue({
            ...formValue,
            [name]: value
        });
    }
    
    const handleSubmit = (e) => {
        e.preventDefault();
        if (formValue.email && formValue.password) {
            props.onLogin(formValue);
        }
    }

    return (
        <div className="auth">
            <form className="auth__form" onSubmit={handleSubmit}>
                <h2 className="auth__title">Вход</h2>
                <input id="email-input" className="auth__input" type="text" placeholder="Email" name="email" minLength="2" maxLength="256" required value={formValue.email} onChange={handleChange} />
                <input id="password-input" className="auth__input" type="password" placeholder="Пароль" name="password" minLength="2" maxLength="256" required value={formValue.password} onChange={handleChange} />
                <button className="auth__save-button" type="submit">Войти</button>
            </form>
        </div>
    );
}

export default Login;