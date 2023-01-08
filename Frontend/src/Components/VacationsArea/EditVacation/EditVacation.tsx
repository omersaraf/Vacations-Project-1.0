import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import "./EditVacation.css";

function EditVacation(): JSX.Element {

    const { register, handleSubmit, formState, setValue } = useForm<VacationModel>();
    const navigate = useNavigate();
    const params = useParams();

    useEffect(() => {
        const id = +params.vacationId; 
        vacationsService.getOneVacation(id)
            .then(vacation => {
                setValue("vacationId", vacation.vacationId);
                setValue("destination", vacation.destination);
                setValue("description", vacation.description);
                setValue("startDate", vacation.startDate);
                setValue("endDate", vacation.endDate);
                setValue("price", vacation.price);
                setValue("image", vacation.image);
            })
            .catch(err => notifyService.error(err));
    }, []);

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.updateVacation(vacation);
            notifyService.success("Vacation has been successfully updated");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="EditVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Edit Vacation</h2>

                <input type="hidden" {...register("vacationId")} />

                <label>Destination: </label>
                <input type="text" {...register("destination", VacationModel.destinationValidation)} />
                <span className="Error">{formState.errors.destination?.message}</span>

                <label>Description: </label>
                <input type="text" {...register("description", VacationModel.descriptionValidation)} />
                <span className="Error">{formState.errors.description?.message}</span>

                <label>Start Date: </label>
                <input type="date" {...register("startDate")} />
                <span className="Error">{formState.errors.startDate?.message}</span>

                <label>End Date: </label>
                <input type="date" {...register("endDate")} />
                <span className="Error">{formState.errors.endDate?.message}</span>

                <label>Price: </label>
                <input type="number" {...register("price", VacationModel.priceValidation)} />
                <span className="Error">{formState.errors.price?.message}</span>

                <label>Image: </label>
                <input type="file" accept="image/*" {...register("image")} />

                <button>Update</button>

            </form>

        </div>
    );
}

export default EditVacation;
