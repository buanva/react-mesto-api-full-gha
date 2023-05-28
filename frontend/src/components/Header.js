import { useLocation, useNavigate } from "react-router-dom";

function Header(props) {
    const { pathname } =  useLocation();
    const navigate = useNavigate();
    const isAuthorized = props.loggedIn && props.email
    const isSignIn = pathname == "/sign-in"
    const buttonText = isAuthorized ? "Выйти" : isSignIn ? "Регистрация" : "Войти"

    function handleClick() {
        if (!isAuthorized) {
            if (isSignIn) {
                navigate('/sign-up', { replace: true })
            } else {
                navigate('/sign-in', { replace: true })
            }
        } else {
            props.onExit();
        }
    }

    return(
        <header className="header">
            <a className="header__logo" href="#"></a>
            <div className="header__auth-options">
                { isAuthorized ? <div className="header__user-email">{props.email}</div> : '' }
                <button className="header__button" onClick={handleClick}>{buttonText}</button>
            </div>
        </header>
    )
}

export default Header;
