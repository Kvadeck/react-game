import React from 'react';
import styled from 'styled-components';

import Inner from './Blocks/Inner'
import Ingredients from './Ingredients'
import CoffeMaschine from './CoffeMaschine'
import Recipe from './Recipe'
import Hud from './HUD'
import { getAllElementsWithAttribute, stopPlay, storeAudio } from '../helpers'
import Sound from 'react-sound';
import { sound, maxOrders, storage, cookingState } from '../constants'
import { findIndex } from 'lodash'

const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

window.soundManager.setup({ debugMode: false });

function App() {

  const [ingCollection, setIngCollection] = React.useState([[], [], []]);
  const [cups, setCups] = React.useState([true, false, false]);

  const [recipe, setRecipe] = React.useState([]);
  const [recipeCount, setRecipeCount] = React.useState(maxOrders);
  const [score, setScore] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  const ingredientClick = new Audio(sound.ingredientClick);
  const audioLocalState = localStorage.getItem(storage.item) || storage.off;

  const [allSound, setAllSound] = React.useState((audioLocalState === 'off') ? true : false);

  function soundSwitchHandle() {
    storeAudio(!allSound);
    setAllSound(!allSound);
  }

  // TODO: Отказаться от поиска в dom активных стаканов

  function addIngredientHandle() {
    return function ({ target }) {

      var t0 = performance.now()
      const cupsActive = getAllElementsWithAttribute('data-cooking');
      var t1 = performance.now()
      console.log("Call to doSomething took " + (t1 - t0) + " milliseconds.")

      const activeCupIdx = findIndex(cups, function(el) { return el === true })

      const ingredientIdx = (target.id === '') ? target.parentNode.id : target.id
      
      const isCooking = cupsActive[activeCupIdx].dataset.cooking;

      if (ingCollection[activeCupIdx].length > 1
        || isCooking === cookingState.ready || isCooking === cookingState.done || isCooking === cookingState.fail) {
        return
      } else {
        ingCollection[activeCupIdx].push(ingredientIdx);
      }

      if (audioLocalState === 'off') {
        stopPlay(ingredientClick)
      } else {
        ingredientClick.play();
      }
      setIngCollection([].concat(ingCollection));
    }
  }

  function toggleAmbienceSoundHandle() {
    setPlaying(!playing)
  };

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

      <Sound
        url={sound.guitarRadioAmbienceLoop}
        playStatus={(playing) ? Sound.status.PLAYING : Sound.status.STOPPED}
        loop={true}
      />

      <Inner justifyContent='center' maxWidth='500px'>
        <Hud
          allSound={allSound}
          playing={playing}
          toggleAmbienceSound={toggleAmbienceSoundHandle}
          score={score}
          recipeCount={recipeCount}
          soundSwitch={soundSwitchHandle}
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
        <Ingredients addIngredient={addIngredientHandle} />
      </Inner>

    </Main>

  );
}

export default App;
