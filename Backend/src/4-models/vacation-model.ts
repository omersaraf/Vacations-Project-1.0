import Joi from "joi";



 class VacationModel {
    public vacationId: number;
    public destination: string;
    public description: string;
    public startDate: Date;
    public endDate: Date;
    public price: number;

    public constructor (vacation: VacationModel) {
        this.vacationId = vacation.vacationId;
        this.destination = vacation.destination;
        this.description = vacation.description;
        this.startDate = vacation.startDate;
        this.endDate = vacation.endDate;
        this.price = vacation.price;
    }

    public static validationSchema = Joi.object({
        vacationId: Joi.number().optional().positive().integer(),
        destination: Joi.string().required().min(2).max(50),
        description: Joi.string().required().min(10).max(1000),
        startDate: Joi.date().required(),
        endDate: Joi.date().required(),
    })

    public validate(): string {
        const result = VacationModel.validationSchema.validate(this);
        return result.error?.message;
    }
 }

 export default VacationModel;