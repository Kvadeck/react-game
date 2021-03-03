import styled from 'styled-components';
import Inner from './blocks/Inner'
import Ingredients from './ingredients/index'
import CoffeMaschine from './coffeMaschine/index'
import Recipe from './recipe/index'
import Hud from './hud/index'
import React from 'react';
import { getAllElementsWithAttribute, findActiveCup, stopPlay, storeAudio } from '../helpers/index'
import Sound from 'react-sound';
import { sound } from '../constants/index'
import { getAllElementsWithAttribute, findActiveCup } from './helpers/index'
const Main = styled.div`
    display:flex;
    justify-content:center;
    width: 100%;
`;

window.soundManager.setup({ debugMode: false });

function App() {

  const [ingCollection, setIngCollection] = React.useState([[], [], []]);
  const [recipe, setRecipe] = React.useState([]);
  const [recipeCount, setRecipeCount] = React.useState(4);
  const [score, setScore] = React.useState(0);
  const [playing, setPlaying] = React.useState(false);

  let ingredientClick = new Audio(sound.ingredientClick);
  let audioLocalState = localStorage.getItem('audio') || 'off';

  const [allSound, setAllSound] = React.useState((audioLocalState === 'off') ? true : false);

  function soundSwitchHandle() {
    storeAudio(!allSound);
    setAllSound(!allSound);
  }

  function addIngredientHandle({ target }) {

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

    if (audioLocalState === 'off') {
      stopPlay(ingredientClick)
    } else {
      ingredientClick.play();
    }
    setIngCollection([].concat(ingCollection));
  }
  const toggleAmbienceSoundHandle = () => setPlaying(!playing);

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
          soundSwitch = {soundSwitchHandle}
        />
        <Recipe
          recipe={recipe}
          getRecipeCount={getRecipeCountHandle}
          scoreAdd={scoreAddHandle}
          recipeCount={recipeCount}
        />

        <CoffeMaschine
          getRecipe={getRecipeHandle}
          ingCollection={ingCollection}
        />
        <Ingredients addIngredient={() => addIngredientHandle} />
      </Inner>

    </Main>

  );
}

export default App;
