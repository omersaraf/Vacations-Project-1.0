import express, { Request, Response, NextFunction, response } from "express";
import VacationModel from "../4-models/vacation-model";
import vacationsLogic from "../5-logic/vacations-logic";
import logic from "../5-logic/vacations-logic";

const router = express.Router(); // Capital R

// GET http://localhost:3001/api/vacations
router.get("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        let userId = +request.params.userId;
        if(!userId) userId = 0;
        const vacations = await logic.getAllVacations(userId);
        response.json(vacations)
    }
    catch (err: any) {
        next(err);
    }
});

// // GET http://localhost:3001/api/liked-vacations/:userId
// router.get("/liked-vacations/:userId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
//     try {
//         const userId = +request.params.userId;
//         const likedVacations = await logic.getVacationsByUser(userId);
//         response.json(likedVacations)
//     }
//     catch (err: any) {
//         next(err);
//     }
// });

// GET http://localhost:3001/api/vacations/:vacationId
router.get("/vacations/:vacationId([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.vacationId;
        const vacation = await logic.getOneVacation(vacationId);
        response.json(vacation)
    }
    catch (err: any) {
        next(err);
    }
});

// POST http://localhost:3001/api/vacations
router.post("/vacations", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.image = request.body.files?.image;
        const vacation = new VacationModel(request.body);
        const addedVacation = await logic.addVacation(vacation);
        response.status(201).json(addedVacation);
    }
    catch (err: any) {
        next(err);
    }
});

// PUT http://localhost:3001/api/vacations/:id
router.put("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        request.body.id = +request.params.id;
        const vacation = new VacationModel(request.body);
        const updatedVacation = await vacationsLogic.updateVacation(vacation);
        response.json(updatedVacation);
    }
    catch (err: any) {
        next(err);
    }
});


// DELETE http://localhost:3001/api/vacations/:id
router.delete("/vacations/:id([0-9]+)", async (request: Request, response: Response, next: NextFunction) => {
    try {
        const vacationId = +request.params.id;
        await vacationsLogic.deleteVacation(vacationId);
        response.sendStatus(204);
    }
    catch (err: any) {
        next(err);
    }
});

export default router;