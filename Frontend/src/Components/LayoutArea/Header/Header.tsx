import AuthMenu from "../../AuthArea/AuthMenu/AuthMenu";
import "./Header.css";

function Header(): JSX.Element {
    return (
        <div className="Header">
            <AuthMenu />
            <h1>Northwind - by the Amazing John Bryce Students!</h1>
        </div>
    );
}

export default Header;

