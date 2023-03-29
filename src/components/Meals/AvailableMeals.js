import MealItem from './MealItem/MealItem';
import styles from './AvailableMeals.module.css';
import Card from '../UI/Card/Card';
import { useEffect, useState } from 'react';

// const DUMMY_MEALS = [
//     {
//       id: 'm1',
//       name: 'Sushi',
//       description: 'Finest fish and veggies',
//       price: 22.99,
//     },
//     {
//       id: 'm2',
//       name: 'Schnitzel',
//       description: 'A german specialty!',
//       price: 16.5,
//     },
//     {
//       id: 'm3',
//       name: 'Barbecue Burger',
//       description: 'American, raw, meaty',
//       price: 12.99,
//     },
//     {
//       id: 'm4',
//       name: 'Green Bowl',
//       description: 'Healthy...and green...',
//       price: 18.99,
//     },
//   ];


const AvailableMeals = () =>{
  const [meals, setMeals] = useState([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  
  useEffect(() => {
      const fetchMeals = async () =>{
        const response = await fetch('https://food-react-app-81b36-default-rtdb.europe-west1.firebasedatabase.app/meals.json');
        
        if(!response.ok){
          throw new Error('Something went wrong !');
        }
        
        const responseData = await response.json();

        const loadedMeals = [];

        for(const key in responseData){
          loadedMeals.push({
            id: key,
            name: responseData[key].name,
            description: responseData[key].description,
            price: responseData[key].price
          })
        }

        setMeals(loadedMeals);
        setIsLoading(false);
      };

      fetchMeals().catch((error) => {
          setIsLoading(false);
          setHttpError(error.message);
      });      
    }, []);

    if(isLoading){
      return (
        <section className={styles.MealsLoading}>
          <p>Loading ... !</p>
      </section>
      );
    }

    if(httpError){
      return(
        <section className={styles.MealsError}>
          <p>{httpError}</p>
        </section>
      );
    }


    const mealList = meals.map((meal) => (
            <MealItem id={meal.id}
                      name={meal.name}
                      description={meal.description}
                      price={meal.price}
                      key={meal.id}
            />
        ));

    return(
        <section className={styles.meals}>
            <Card>
                <ul>{mealList}</ul>
            </Card>
        </section>
    );
};

export default AvailableMeals;