import { NavLink, Outlet } from "react-router-dom";

const Navigation = ({ setToken }) => {
    const navSelected = ({ isActive }) => {
        return {
            color: isActive ? "var(--white)" : "var(--primary-color)",
            background: isActive ? "#191919" : "#121212",
        };
    };

    return (
        <>
            <nav>
                <ul className="menu">
                    <li>
                        <NavLink end style={navSelected} to="/">
                            Dashboard
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={navSelected} to="/members">
                            Members
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={navSelected} to="/lessons">
                            Lessons
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={navSelected} to="/attendance">
                            Attendance
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={navSelected} to="/products">
                            Products
                        </NavLink>
                    </li>
                    <li>
                        <NavLink style={navSelected} to="/payments">
                            Payments
                        </NavLink>
                    </li>
                </ul>

                <a className="logoutButton" href="/" onClick={setToken}>
                    Logout
                </a>
            </nav>
            <Outlet />
        </>
    );
};

export default Navigation;
