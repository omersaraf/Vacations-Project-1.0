import dal from "../2-utils/dal";
import { ErrorModel, ResourceNotFoundErrorModel, ValidationErrorModel } from "../4-models/error-models";
import VacationModel from "../4-models/vacation-model";
import { OkPacket } from "mysql";

// async function getAllVacations(): Promise<VacationModel[]> {
//   const sql = ` SELECT *
//                   FROM vacations
//                           `;

//   const vacations = await dal.execute(sql, {});
//   return vacations;
// }

async function getAllVacations(
  userId: number
): Promise<VacationModel[]> {
  const sql = ` SELECT *
                  FROM vacations 
                  WHERE 
                          `;

  const vacations = await dal.execute(sql, {});
  return vacations;
}

async function getLikedVacationsByUser(userId: number) {
  if (userId === 0) {
    const sql = ` SELECT *
                  FROM vacations 
                  WHERE 
                          `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
  } else {
    const sql = `
          SELECT DISTINCT
              V.*,
              EXISTS(SELECT * FROM followers WHERE vacationId = F.vacationId AND userId = ?) AS isFollowing,
              COUNT(F.userId) AS followersCount
          FROM vacations AS V LEFT JOIN followers AS F
          ON V.vacationId = F.vacationId
          GROUP BY vacationId
          ORDER BY startDate DESC
      `;
    const vacations = await dal.execute(sql, [userId]);
    return vacations;
  }
}

async function getOneVacation(vacationId: number) {
  const sql = `
                    SELECT * FROM vacations WHERE vacationId = ?
        `;
  const vacations = await dal.execute(sql, [vacationId]);
  const vacation = vacations[0];
  if(!vacation) throw new ResourceNotFoundErrorModel(vacationId)
  return vacation;
}

async function addVacation(vacation: VacationModel): Promise<VacationModel> {
  // Validation:
  const errors = vacation.validate();
  if (errors) throw new ValidationErrorModel(errors);

  const sql = `
    INSERT INTO vacations(
        vacationId,
        destination,
        description,
        startDate,
        endDate,
        price
    )
    VALUES(
        Default,
        ?,
        ?,
        ?,
        ?,
        ?
        )
`;

  const info: OkPacket = await dal.execute(sql, [
    vacation.destination,
    vacation.description,
    vacation.startDate,
    vacation.endDate,
    vacation.price
  ]);
  vacation.vacationId = info.insertId;
  return vacation;
}


// Update existing vacation: 
async function updateVacation(vacation: VacationModel): Promise<VacationModel> {

    const error = vacation.validate();
    if(error) throw new ValidationErrorModel(error);

    const sql = `
        UPDATE vacations SET
          destination = ? ,
          description = ? ,
          startDate = ? ,
          endDate = ? ,
          price = ?
        WHERE vacationId = ?
    `;

    const info: OkPacket = await dal.execute(sql, [
        vacation.destination,
        vacation.description,
        vacation.startDate,
        vacation.endDate,
        vacation.price,
        vacation.vacationId]);

    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacation.vacationId);
    return vacation;
}

// Delete product:
async function deleteVacation(vacationId: number): Promise<void> {

    const sql = `DELETE FROM vacations WHERE vacationId = ?`;

    const info: OkPacket = await dal.execute(sql, [vacationId]);
    if(info.affectedRows === 0) throw new ResourceNotFoundErrorModel(vacationId);
}


export default {
  getAllVacations,
  getLikedVacationsByUser,
  getOneVacation,
  addVacation,
  updateVacation,
  deleteVacation
};
