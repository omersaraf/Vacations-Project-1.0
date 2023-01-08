import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import VacationModel from "../../../Models/VacationModel";
import ProductModel from "../../../Models/VacationModel";
import notifyService from "../../../Services/NotifyService";
import vacationsService from "../../../Services/VacationsService";
import useVerifyLoggedIn from "../../../Utils/useVerifyLoggedIn";
import "./AddVacation.css";

function AddVacation(): JSX.Element {

    // useVerifyLoggedIn();

    const { register, handleSubmit, formState } = useForm<ProductModel>();
    const navigate = useNavigate();

    interface VacationCardProps {
        vacation: VacationModel;
    }

    async function send(vacation: VacationModel) {
        try {
            await vacationsService.addVacation(vacation);
            notifyService.success("Vacation has been successfully added");
            navigate("/vacations");
        }
        catch (err: any) {
            notifyService.error(err);
        }
    }

    return (
        <div className="AddVacation Box">

            <form onSubmit={handleSubmit(send)}>

                <h2>Add Vacation</h2>

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

                <button>Add</button>

            </form>

        </div>
    );
}

export default AddVacation;
