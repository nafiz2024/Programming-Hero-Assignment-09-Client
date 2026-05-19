export const addCarDetails = async (car) => {
    await fetch('http://localhost:5000/car', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(car)
        })
}

