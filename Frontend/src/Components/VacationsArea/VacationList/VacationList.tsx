import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import Spinner from "../../SharedArea/Spinner/Spinner";
import VacationCard from "../VacationCard/VacationCard";
import "./VacationList.css";

function VacationList(): JSX.Element {

    const [vacations, setVacations] = useState<VacationModel[]>([]);

    useEffect(() => {
        vacationsService.getAllVacations()
            .then(vacations => setVacations(vacations))
            .catch(err => notifyService.error(err));
    }, []);

    return (
        <div className="VacationList">

            {vacations.length === 0 && <Spinner />}

            <NavLink to="/vacations/new">➕</NavLink>

            {vacations.map(v => <VacationCard key={v.vacationId} vacation={v} />)}

        </div>
    );
}

export default VacationList;
