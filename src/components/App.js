import styled from 'styled-components';
import Inner from './blocks/Inner'
import Ingredients from './ingredients/index'
import CoffeMaschine from './coffeMaschine/index'
import Recipe from './recipe/index'
import Hud from './hud/index'
import React from 'react';
import { sound } from '../constants/index'
import { getAllElementsWithAttribute, findActiveCup } from '../helpers/index'
const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

function App() {

  const [ingCollection, setIngCollection] = React.useState([[],[],[]]);    
  const [recipe, setRecipe] = React.useState([]);    
  let ingredientClick = new Audio(sound.ingredientClick);

  function addIngredientHandle({target}) {

    const ingName = target.id;
    
    const cupsActive = getAllElementsWithAttribute('data-active');
    const activeCupIdx = findActiveCup(cupsActive);

    const isCooking = cupsActive[activeCupIdx].dataset.cooking;

    if (ingCollection[activeCupIdx].length > 1 
      || isCooking === 'ready' || isCooking === 'done' || isCooking === 'fail') {
      return;
    } else {
      ingCollection[activeCupIdx].push(ingName);
    }

    ingredientClick.play();
    setIngCollection([].concat(ingCollection));
  }

  function getRecipeHandle(recipe) {
    setRecipe([].concat(recipe));
  }

  return (
    <Main>
      <Inner justifyContent='center' maxWidth='500px'>
        <Hud/>
        <Recipe recipe={recipe}/>
        <CoffeMaschine getRecipe={getRecipeHandle} ingCollection={ingCollection} />
        <Ingredients addIngredient = {() => addIngredientHandle}/>
      </Inner>
    </Main>
  );
}

export default App;
