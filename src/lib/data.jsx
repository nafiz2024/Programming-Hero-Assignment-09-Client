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