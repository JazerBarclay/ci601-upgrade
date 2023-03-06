import Logo from "../assets/martial-arts-gym-bexhill-logo.png";
import "./Login.css";

import { requestLogin } from "../components/api/loginRequest";

const Login = ({ setToken }) => {
    const handleSubmit = async (event) => {
        event.preventDefault();

        const responseToken = await requestLogin(
            event.target.usernameInput.value,
            event.target.passwordInput.value
        );

        if (responseToken) setToken({ token: responseToken });
    };

    return (
        <div className="loginContainer">
            <div>
                <img className="loginLogo" src={Logo} alt="UMA Logo" />
                <h1>Up-grade Login</h1>
                <form className="loginForm" onSubmit={handleSubmit}>
                    <label className="login-input-label">Username: </label>
                    <input
                        id="usernameInput"
                        type="text"
                        className="input-text"
                        required
                    />
                    <label className="login-input-label">Password: </label>
                    <input
                        id="passwordInput"
                        type="password"
                        className="input-text"
                        required
                    />
                    <button
                        type="submit"
                        id="loginButton"
                        className="btn btn-login"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
