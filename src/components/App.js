import React from 'react';
import styled from 'styled-components';

import Ingredients from './Ingredients'
import CoffeMaschine from './CoffeMaschine'
import Recipe from './Recipe'
import HUD from './HUD'
import Options from './Options'
import Confirm from './Confirm'
import { soundAssets, maxOrders, cookingState } from '../constants'
import { newCupSelect } from '../helpers'
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

window.soundManager.setup({ debugMode: false })

function App() {

  const [ingCollection, setIngCollection] = React.useState([[], [], []])

  const [selectedCups, setSelectedCups] = React.useState([true, false, false])
  const [cupsViewState, setCupsViewState] = React.useState([true, false, false])
  const [cupWithIngredient, setCupWithIngredient] = React.useState([false, false, false])

  const [recycle, setRecycle ] = React.useState([false, false, false])

  const [flowJet, setFlowJet ] = React.useState([false, false, false])

  const [cookStatus, setCookStatus] = React.useState(['start', 'start', 'start'])

  const [recipe, setRecipe] = React.useState([])
  const [recipeCount, setRecipeCount] = React.useState(maxOrders)

  const [score, setScore] = React.useState(0)

  const [toogleOptions, setToogleOptions] = React.useState(false)

  const ingredientClick = new Audio(soundAssets.ingredientClick)

  // !TODO: Отказаться от поиска в dom активных стаканов в функции addIngredientHandle

  function addIngredientHandle({ target }) {

    const activeCupIdx = findIndex(selectedCups, (el) => el === true)
    const ingredientIdx = (target.id === '') ? target.parentNode.id : target.id
    const isCooking = cookStatus[activeCupIdx]

    // Not add more then two ingredients
    if (ingCollection[activeCupIdx].length > 1) return

    // Add only if status === start
    else if (isCooking === cookingState.ready || isCooking === cookingState.done || isCooking === cookingState.fail) return

    // Change cup heigth with ingredient
    else if (ingCollection[activeCupIdx].length === 1) {

      cupWithIngredient[activeCupIdx] = true
      setCupWithIngredient([].concat(cupWithIngredient))

      // Next cup selection 
      const nextCupIdx = findIndex(ingCollection, (arr) => arr.length === 0)

      if (nextCupIdx !== -1) {
        setSelectedCups([].concat(newCupSelect(nextCupIdx, selectedCups)))
        setCupsViewState([].concat(newCupSelect(nextCupIdx, cupsViewState)))
      }
    }

    if (localStorage.getItem('audio') !== 'off') {
      ingredientClick.play()
    }

    // Reset cup state
    cupsViewState[activeCupIdx] = false
    setCupsViewState([].concat(cupsViewState))

    recycle[activeCupIdx] = false
    setRecycle([].concat(recycle))

    ingCollection[activeCupIdx].push(ingredientIdx)
    return setIngCollection([].concat(ingCollection))
  }

  function getRecipeHandle(recipe) {
    return setRecipe([].concat(recipe))
  }

  function getRecipeCountHandle(count) {
    return setRecipeCount(count)
  }

  function scoreAddHandle(count) {
    return setScore(score + count)
  }

  return (
    <Main>
      <Options
        toogleOptions={toogleOptions}
      />
      <Confirm recipeCount={recipeCount} />
      <Inner>

        <HUD
          score={score}
          recipeCount={recipeCount}
          setToogleOptions={() => setToogleOptions}
        />

        <Recipe
          recipe={recipe}
          getRecipeCount={getRecipeCountHandle}
          scoreAdd={scoreAddHandle}
          recipeCount={recipeCount}
        />

        <CoffeMaschine
          selectedCups={selectedCups}
          setSelectedCups={setSelectedCups}

          cupsViewState={cupsViewState}
          setCupsViewState={setCupsViewState}

          cupWithIngredient={cupWithIngredient}
          setCupWithIngredient={setCupWithIngredient}
          
          getRecipe={getRecipeHandle}
          ingCollection={ingCollection}

          recycle={recycle}
          setRecycle={setRecycle}

          flowJet={flowJet}
          setFlowJet={setFlowJet}
        />

        <Ingredients addIngredient={() => addIngredientHandle} />
      </Inner>

    </Main>

  );
}

export default App;
