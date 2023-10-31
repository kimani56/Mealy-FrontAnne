import React, { useState, useEffect } from 'react';

const DayMenu = () => {
    const [meals, setMeals] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        // If you know the menuId or other criteria to fetch the data, you can define it here.
        const menuId = 'YOUR_MENU_ID'; // replace 'YOUR_MENU_ID' with your menuId or other criteria.

        fetch(`/menu/${menuId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                setMeals(data.meals);
                setIsLoading(false);
            })
            .catch(err => {
                setError(err.message);
                setIsLoading(false);
            });

    }, []); // removed dependency on props from the dependency array

    const handleSelectMeal = (mealId) => {
        console.log("Meal selected: ", mealId);
        // This function can be modified to interact with an API if needed.
    };

    if (isLoading) {
        return <span>Loading...</span>;
    }

    if (error) {
        return <span>Error: {error}</span>;
    }

    return (
        <div>
            <h2>Menu for a specific date</h2> {/* Removed the date display based on props */}
            <ul>
                {meals.map(meal => (
                    <li key={meal.id}>
                        <h3>{meal.name}</h3>
                        <p>{meal.description}</p>
                        <p>Price: ${meal.price}</p>
                        <img src={meal.image_url} alt={meal.name} width="100" />
                        <button onClick={() => handleSelectMeal(meal.id)}>Select</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default DayMenu;
