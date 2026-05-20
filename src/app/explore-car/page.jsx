"use client";

import { useEffect, useState } from "react";
import ExploreCarsView from "@/component/ExploreCarsView";
import { authClient } from "@/lib/auth-client";
import { getCarData } from "@/lib/data";
import LoadingSpinner from "@/component/LoadingSpinner";

const ExploreCar = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadCars = async () => {
            const { data: tokenData } = await authClient.token();
            const data = await getCarData(tokenData?.token);
            setCars(Array.isArray(data) ? data : []);
            setLoading(false);
        };

        loadCars();
    }, []);

    if (loading) {
        return (
            <main className="min-h-[60vh] px-4 py-10">
                <LoadingSpinner label="Loading cars..." />
            </main>
        );
    }

    return (
        <div>
            <ExploreCarsView cars={cars} />
        </div>
    );
};

export default ExploreCar;
