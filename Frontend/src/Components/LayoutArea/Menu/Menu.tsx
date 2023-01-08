import { NavLink } from "react-router-dom";
import TotalVacations from "../../VacationsArea/TotalVacations/TotalVacations";
import TotalProducts from "../../VacationsArea/TotalVacations/TotalVacations";
import "./Menu.css";

function Menu(): JSX.Element {
    return (
        <div className="Menu">
            
            <NavLink to="/home">Home</NavLink>
            <NavLink to="/vacations">Vacations</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/contact-us">Contact Us</NavLink>

            <TotalVacations />

        </div>
    );
}

export default Menu;
