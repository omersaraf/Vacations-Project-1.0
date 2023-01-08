import axios from "axios";
import fs from "fs";
import VacationModel from "../Models/VacationModel";
import { authStore } from "../Redux/AuthState";
import { VacationsActionType, vacationsStore } from "../Redux/VacationsState";
import appConfig from "../Utils/Config";
import { v4 as uuid } from "uuid";

class VacationsService {

    // Get all vacations:
    public async getAllVacations(): Promise<VacationModel[]> {

        let vacations = vacationsStore.getState().vacations;

        if (vacations.length === 0) {

            const response = await axios.get<VacationModel[]>(appConfig.vacationsUrl); // AJAX
            vacations = response.data;
            vacationsStore.dispatch({ type: VacationsActionType.FetchVacations, payload: vacations });
        }

        return vacations;
    }

    // Get one product:
    public async getOneVacation(id: number): Promise<VacationModel> {

        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === id);

        if (!vacation) {

            const response = await axios.get<VacationModel>(appConfig.vacationsUrl + id); 
            vacation = response.data;
        }

        return vacation;
    }

    // REST API Methods:
    // GET      Get data from server
    // POST     Add new data to server
    // PUT      Update full data in server - sending all properties
    // PATCH    Update partial data in server - sending some properties
    // DELETE   Delete data in server

    // Add vacation: 
    public async addVacation(vacation: VacationModel): Promise<void> { 
        
    if (vacation.image) {
        const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
        vacation.imageName = uuid() + extension;
        await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
        delete vacation.image;
    }

        const myFormData = new FormData(); // Can contain strings and / or files.
        myFormData.append("destination", vacation.destination);
        myFormData.append("description", vacation.description);
        myFormData.append("startDate", vacation.startDate.toLocaleDateString());
        myFormData.append("endDate", vacation.endDate.toLocaleDateString());
        myFormData.append("price", vacation.price.toString());
        myFormData.append("imageName", vacation.imageName);

        // Sending object with file (the image):
        const response = await axios.post<VacationModel>(appConfig.vacationsUrl, myFormData); // Sending object without files.

        // Extract the added vacation: 
        const addedVacation = response.data;

        // Add the added vacation to the global state:
        vacationsStore.dispatch({ type: VacationsActionType.AddVacation, payload: addedVacation });
    }

    // Update Vacation: 
    public async updateVacation(vacation: VacationModel): Promise<void> {

        if (vacation.image) {

            // If we have a previous image:
            if (fs.existsSync("./src/1-assets/images/" + vacation.vacationId)) {
    
                // Delete it:
                fs.unlinkSync("./src/1-assets/images/" + vacation.vacationId);
            }
    
            const extension = vacation.image.name.substring(vacation.image.name.lastIndexOf("."))
            vacation.imageName = uuid() + extension;
            await vacation.image.mv("./src/1-assets/images/" + vacation.imageName);
            delete vacation.image;
        }
    
            const myFormData = new FormData(); // Can contain strings and / or files.
            myFormData.append("destination", vacation.destination);
            myFormData.append("description", vacation.description);
            myFormData.append("startDate", vacation.startDate.toLocaleDateString());
            myFormData.append("endDate", vacation.endDate.toLocaleDateString());
            myFormData.append("price", vacation.price.toString());
            myFormData.append("imageName", vacation.imageName);
    

        const response = await axios.put<VacationModel>(appConfig.vacationsUrl + vacation.vacationId, myFormData); // Sending object without files.
        const updatedVacation = response.data;
        vacationsStore.dispatch({ type: VacationsActionType.UpdateVacation, payload: updatedVacation });
    }

    // Delete Vacation: 
    public async deleteVacation(id: number): Promise<void> {

        let vacations = vacationsStore.getState().vacations;
        let vacation = vacations.find(v => v.vacationId === id);

        if (fs.existsSync("./src/1-assets/images/" + vacation.imageName)) {
            fs.unlinkSync("./src/1-assets/images/" + vacation.imageName);
        }

        await axios.delete<void>(appConfig.vacationsUrl + id);

        vacationsStore.dispatch({ type: VacationsActionType.DeleteVacation, payload: id });

    }

}

const vacationsService = new VacationsService();

export default vacationsService;
