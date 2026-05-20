"use client";

import { useEffect, useState } from "react";
import ExploreCarsView from "@/component/ExploreCarsView";
import { authClient } from "@/lib/auth-client";
import { getCarData } from "@/lib/data";
import LoadingSpinner from "@/component/LoadingSpinner";

const ExploreCar = () => {
    const [cars, setCars] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState("");
    const [searchText, setSearchText] = useState("");
    const [selectedType, setSelectedType] = useState("all");

    useEffect(() => {
        const loadCars = async () => {
            setLoading(true);
            try {
                let token = "";
                try {
                    const { data: tokenData } = await authClient.token();
                    token = tokenData?.token || "";
                } catch {
                    token = "";
                }

                const data = await getCarData(token, {
                    search: searchText,
                    type: selectedType,
                });
                setCars(Array.isArray(data) ? data : []);
                setLoadError("");
            } catch (error) {
                setCars([]);
                setLoadError("Failed to load cars. Please refresh and try again.");
            } finally {
                setLoading(false);
            }
        };

        loadCars();
    }, [searchText, selectedType]);

    if (loading) {
        return (
            <main className="min-h-[60vh] px-4 py-10">
                <LoadingSpinner label="Loading cars..." />
            </main>
        );
    }

    if (loadError) {
        return (
            <main className="min-h-[60vh] px-4 py-10">
                <div className="mx-auto max-w-3xl rounded-2xl border border-rose-200 bg-rose-50 px-4 py-5 text-sm text-rose-600 sm:px-6">
                    {loadError}
                </div>
            </main>
        );
    }

    return (
        <div>
            <ExploreCarsView
                cars={cars}
                searchText={searchText}
                selectedType={selectedType}
                onSearchChange={setSearchText}
                onTypeChange={setSelectedType}
            />
        </div>
    );
};

export default ExploreCar;
