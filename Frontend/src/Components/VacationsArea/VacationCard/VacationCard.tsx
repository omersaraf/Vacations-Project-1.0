import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import appConfig from "../../../Utils/Config";
import "./VacationCard.css";

interface VacationCardProps {
    vacation: VacationModel;
}

function VacationCard(props: VacationCardProps): JSX.Element {
    return (
        <div className="VacationCard Box">
            <div>
                <span>{props.vacation.destination}</span>
                <br />
                <span>{props.vacation.description}</span>
                <br />
            </div>
            <div>
                <NavLink to={"/vacations/details/" + props.vacation.vacationId}>
                    <img src={appConfig.vacationImagesUrl + props.vacation.imageName} />
                </NavLink>
            </div>

        </div>
    );
}

export default VacationCard;
