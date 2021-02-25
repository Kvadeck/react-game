import styled from 'styled-components';
import Inner from './blocks/Inner'
import Ingredients from './ingredients/index'
import CoffeMaschine from './coffeMaschine/index'
import Recipe from './recipe/index'
import React from 'react';
import { sound } from '../constants/index'

const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

function App() {

  const [ingCollection, setIngCollection] = React.useState([[],[],[]]);    
  let ingredientClick = new Audio(sound.ingredientClick);

  function addIngredientHandle({target}) {

    const ingName = target.id;
    const cups = document.querySelectorAll('.cup');
    const dataActive = [];

    cups.forEach((el)=> { dataActive.push(el.dataset.active);})
    const ingIdx = dataActive.indexOf('true');

    const isCooking = cups[ingIdx].dataset.cooking;

    if (ingCollection[ingIdx].length > 1 || isCooking === 'true') {
      return;
    } else {
      ingCollection[ingIdx].push(ingName);
    }

    ingredientClick.play();
    setIngCollection([].concat(ingCollection));
  }

  return (
    <Main>
      <Inner justifyContent='center' maxWidth='500px'>
        <Recipe/>
        <CoffeMaschine ingCollection={ingCollection} />
        <Ingredients addIngredient = {() => addIngredientHandle}/>
      </Inner>
    </Main>
  );
}

export default App;
