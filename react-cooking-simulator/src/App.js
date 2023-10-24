import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Dish from './components/Dish';
import Ingredients from './components/Ingredients';
import CookingControls from './components/CookingControls';

const AppContainer = styled.div`
  text-align: center;
`;

const availableIngredients = [
  {
    id: 1,
    name: 'Tomato',
    image: 'tomato.png', // Replace with the actual image file
  },
  {
    id: 2,
    name: 'Onion',
    image: 'onion.png', // Replace with the actual image file
  },
  // Add more ingredients as needed
];

const App = () => {
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [cookingStatus, setCookingStatus] = useState(false);
  const [cookingProgress, setCookingProgress] = useState(0);

  useEffect(() => {
    let interval;

    if (cookingStatus) {
      interval = setInterval(() => {
        if (cookingProgress < 100) {
          setCookingProgress(cookingProgress + 10); // Adjust cooking progress as needed
        } else {
          setCookingStatus(false);
          clearInterval(interval);
          setDishImage('cooked-dish.png'); // Update the dish with the cooked image
        }
      }, 1000); // Adjust the cooking interval as needed
    }

    return () => {
      clearInterval(interval);
    };
  }, [cookingStatus, cookingProgress]);

  const [dishImage, setDishImage] = useState('raw-dish.png'); // Initial dish image

  const handleSelectIngredient = (ingredient) => {
    setSelectedIngredients([...selectedIngredients, ingredient]);
  };

  const handleStartCooking = () => {
    if (selectedIngredients.length > 0) {
      setCookingStatus(true);
    }
  };

  const handleStopCooking = () => {
    setCookingStatus(false);
  };

  const handleResetCooking = () => {
    setCookingStatus(false);
    setDishImage('raw-dish.png'); // Reset the dish image
    setSelectedIngredients([]); // Clear selected ingredients
    setCookingProgress(0); // Reset the cooking progress
  };

  return (
    <AppContainer>
      <h1>Cooking Simulator</h1>
      <Dish dishImage={dishImage} cookingProgress={cookingProgress} />
      <Ingredients availableIngredients={availableIngredients} onSelectIngredient={handleSelectIngredient} />
      <CookingControls
        onStartCooking={handleStartCooking}
        onStopCooking={handleStopCooking}
        onResetCooking={handleResetCooking}
        selectedIngredients={selectedIngredients}
        cookingStatus={cookingStatus}
      />
    </AppContainer>
  );
};

export default App;
