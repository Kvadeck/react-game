import React from 'react';
import styled from 'styled-components';

import Ingredients from './Ingredients'
import CoffeMaschine from './CoffeMaschine'
import Recipe from './Recipe'
import HUD from './HUD'
import Options from './Options'
import { sound, maxOrders, storage, cookingState, audioLocalState } from '../constants'
import { findIndex } from 'lodash'

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    top: 0;
    left: 0;
    max-width: 500px;
    width: 100%;
`;

const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

// window.soundManager.setup({ debugMode: false });

function App() {

  const [ingCollection, setIngCollection] = React.useState([[], [], []])

  const [cups, setCups] = React.useState([true, false, false])
  const [cookStatus, setCookStatus] = React.useState(['start', 'start', 'start'])

  const [recipe, setRecipe] = React.useState([])
  const [recipeCount, setRecipeCount] = React.useState(maxOrders)

  const [score, setScore] = React.useState(0)

  const [toogleModal, setToogleModal] = React.useState('closed')

  const ingredientClick = new Audio(sound.ingredientClick)
  

  // !TODO: Отказаться от поиска в dom активных стаканов в функции addIngredientHandle

  function addIngredientHandle({ target }) {

      const activeCupIdx = findIndex(cups, (el) => el === true)
      const ingredientIdx = (target.id === '') ? target.parentNode.id : target.id
      const isCooking = cookStatus[activeCupIdx]

      // Only two ingredients in one cup
      if (ingCollection[activeCupIdx].length > 1) return
      // Add only if status === start
      else if (isCooking === cookingState.ready || isCooking === cookingState.done || isCooking === cookingState.fail) return
      
      if (audioLocalState !== 'off') {
        ingredientClick.play()
      }

      ingCollection[activeCupIdx].push(ingredientIdx)
      return setIngCollection([].concat(ingCollection))
    
  }

  function getRecipeHandle(recipe) {
    setRecipe([].concat(recipe));
  }

  function getRecipeCountHandle(count) {
    setRecipeCount(count);
  }

  function scoreAddHandle(count) {
    setScore(score + count);
  }

  return (
    <Main>
      <Options 
        toogleModal={toogleModal}
      />
      <Inner>

        <HUD
          score={score}
          recipeCount={recipeCount}
          setToogleModal = {() => setToogleModal}
        />

        <Recipe
          recipe={recipe}
          getRecipeCount={getRecipeCountHandle}
          scoreAdd={scoreAddHandle}
          recipeCount={recipeCount}
        />

        <CoffeMaschine
          cups={cups}
          setCups={setCups}
          getRecipe={getRecipeHandle}
          ingCollection={ingCollection}
        />

        <Ingredients addIngredient={() => addIngredientHandle} />
      </Inner>

    </Main>

  );
}

export default App;
