import { getCarData } from "@/lib/data";
import ExploreCarsView from "@/component/ExploreCarsView";

const ExploreCar = async () => {

    const cars = await getCarData()

    return (
        <div>
            <ExploreCarsView cars={cars} />
        </div>
    );
};

export default ExploreCar;
