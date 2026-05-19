export const addCarDetails = async (car) => {
    await fetch('http://localhost:5000/car', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })

        
}

export const getCarData = async () => {
    const res = await fetch('http://localhost:5000/car');
    const data = await res.json();

    return data
}

export const getCarDataById = async (id) => {
    try {
        const res = await fetch(`http://localhost:5000/car/${id}`);

        if (res.ok) {
            const data = await res.json();
            return data;
        }
    } catch {
        // Fallback handled below
    }

    try {
        const cars = await getCarData();
        return cars.find((car) => String(car._id || car.id) === String(id)) || null;
    } catch {
        return null;
    }
}
