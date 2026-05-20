const safeFetchJson = async (url, options = {}) => {
    try {
        const res = await fetch(url, options);
        const contentType = res.headers.get("content-type") || "";

        if (!res.ok || !contentType.includes("application/json")) {
            return null;
        }

        return await res.json();
    } catch {
        return null;
    }
};

const authHeaders = (token, extraHeaders = {}) => ({
    ...extraHeaders,
    ...(token ? { authorization: `Bearer ${token}` } : {}),
});

export const addCarDetails = async (car, token) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car`, {
            method: 'POST',
            headers: authHeaders(token, {
                'content-type': 'application/json'
            }),
            body: JSON.stringify(car)
        })

        
}

export const getCarData = async (token) => {
    const data = await safeFetchJson(`${process.env.NEXT_PUBLIC_SERVER_URL}/car`, {
        cache: "no-store",
        headers: authHeaders(token),
    });

    return Array.isArray(data) ? data : []
}

export const getCarDataById = async (id, token) => {
    try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car/${id}`, {
            headers: authHeaders(token),
        });

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch {
        // Fallback handled below
    }

    try {
        const cars = await getCarData(token);
        return cars.find((car) => String(car._id || car.id) === String(id)) || null;
    } catch {
        return null;
    }
}

export const editCarDataById = async (_id, carData, token) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car/${_id}`, {
                method: "PATCH",
                headers: authHeaders(token, {
                    "Content-Type": "application/json",
                }),
                body: JSON.stringify(carData),
            });
}

export const deleteCarDataById = async (car, token) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/car/${car._id}`, {
            method: 'DELETE',
            headers: authHeaders(token, {
                'Content-Type': "application/json"
            }),
        });
}

export const addCarBookingData = async (bookingData, token) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
            method: "POST",
            headers: authHeaders(token, {
                'content-type': "application/json"
            }),
            body: JSON.stringify(bookingData)
        })
}

export const getCarBookingData = async (token) => {
    const data = await safeFetchJson(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking`, {
        headers: authHeaders(token),
    });
    const list = Array.isArray(data) ? data : data ? [data] : [];

    return list.filter((item) => (
        item &&
        typeof item === "object" &&
        (item.carId || item.userId || item.driverNeed || item.pickupDate || item.dropOffDate || item.specialNote)
    ));
}

export const deleteBookingDataById = async (bookingId, token) => {
    await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/booking/${bookingId}`, {
        method: "DELETE",
        headers: authHeaders(token, {
            "Content-Type": "application/json",
        }),
    });
}
