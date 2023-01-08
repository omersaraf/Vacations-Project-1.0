import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";

import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";

import appConfig from "../../../Utils/Config";
import "./VacationDetails.css";

function VacationDetails(): JSX.Element {

    const params = useParams();
    const [vacation, setVacation] = useState<VacationModel>();
    const navigate = useNavigate();

    useEffect(() => {
        const id = +params.vacationId; 
        vacationsService.getOneVacation(id)
            .then(vacation => setVacation(vacation))
            .catch(err => notifyService.error(err));
    }, []);

    async function deleteVacation(id: number) {
        try {
            await vacationsService.deleteVacation(id);
            notifyService.success("Vacation has been deleted");
            navigate("/vacations");
        }
        catch(err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="VacationDetails">

            <h2>Vacation Details</h2>

            {vacation &&
                <>
                    {/* <h3>Name: {product?.name}</h3> */}
                    <h2>Destination: {vacation.destination}</h2>
                    <h3>Description: {vacation.description}</h3>
                    <h4>Dates: {vacation.startDate + " - " + vacation.endDate}</h4>
                    <h4>Price: {vacation.price} </h4>
                    <img src={appConfig.vacationImagesUrl + vacation.imageName} />
                </>
            }

            <br />
            <br />

            <NavLink to="/vacations">Back</NavLink>
            <span> | </span>
            <NavLink to={"/vacations/edit/" + vacation?.vacationId}>Edit</NavLink>
            <span> | </span>
            <NavLink to="#" onClick={() => deleteVacation(vacation.vacationId)}>Delete</NavLink>

        </div>
    );
}

export default VacationDetails;
