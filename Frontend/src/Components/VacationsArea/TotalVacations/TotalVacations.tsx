import { useEffect, useState } from "react";
import { vacationsStore } from "../../../Redux/VacationsState";

import "./TotalVacations.css";

function TotalVacations(): JSX.Element {

    const [count, setCount] = useState<number>(0);

    useEffect(() => {

        // Take current products when component first displayed:
        setCount(vacationsStore.getState().vacations.length);

        // Listen to any change in the products global state:
        const unsubscribe = vacationsStore.subscribe(() => {

            // Take current products when there is a change:
            setCount(vacationsStore.getState().vacations.length);

        });

        return () => {

            // Unsubscribe: 
            unsubscribe();
        };

    }, []);

    if(count === 0) return null;

    return (
        <div className="TotalVacations Box">
            <span>Total Vacations: {count}</span>
        </div>
    );
}

export default TotalVacations;
