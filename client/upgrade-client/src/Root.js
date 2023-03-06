import useToken from "./components/auth/useToken";
import Login from "./login/Login";
import App from "./app/App";

// import "./Root.css";

const Root = () => {
    const { token, setToken } = useToken();

    if (!token) {
        return <Login setToken={ setToken } />;
    }

    return <App setToken={ setToken } />;

};

export default Root;
