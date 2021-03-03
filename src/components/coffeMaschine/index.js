import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';
import { clearArray, buttonIconSwitcher, getAllElementsWithAttribute, coffeeBrewAudio, stopPlay, buttonStateSwitcher } from '../../helpers/index'
import Handle from '../../assets/expresso/handle/handle.png';
import { cups, sound, cupIngredients } from '../../constants/index'
import Timer from '../timer/index'

const CoffeMaschineWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 80%;
    padding: 0 15px;
`;
const CoffeMaschineOuter = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: relative;
    width: 100%;
    padding: 0 8px;
    min-height: 300px;
    border-radius: 25px 25px 0 0;
    background-color: var(--background-coffemaschineouter-color);
`;
const CoffeMaschineCupsInner = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    border-radius: 2px 2px 0 0;
    min-height: 190px;
    
    z-index: 1;
    justify-content: flex-end;
    flex-direction: column;
    border-bottom: var(--border-bottom-coffemaschinecupsouter-color) 1rem solid;
    background-color: var(--background-coffemaschinecupsinner-color);
`;
const CoffeMaschineBorder = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 6px;
    background-color: var(--border-bottom-coffemaschinecupsinner-color);
`;
const CoffeMaschineButtonsInner = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    margin-top: -30px;
    border-radius: 30px 30px 0 0;
    align-items: center;
    min-height: 140px;
    background-color: var(--background-coffemaschinebuttonsinner-color);
`;
const CoffeMaschineButton = styled.span`
   display: flex;
   background-image: url(${({ buttonIcon }) => buttonIcon || "none"});
   width: 100px;
   background-repeat: no-repeat;
   height: 100px;
   margin: 0 9px;
   cursor: pointer;
   &:after {
       content: '';
       background-image: url(${Handle});
       width: 50px;
       height: 30px;
       position: absolute;
       display: block;
       z-index: 10;
       bottom: -30px;
       margin-left: 25px;
   }
`;
const CupsInner = styled.div`
   display: flex;
   justify-content: space-between;
   margin: 0 12px;
`;
const CupsItem = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    width: 92px;
    height: 120px;
    cursor: pointer;
    z-index: 4;
    background-image: url(${cups.normal});
    ${({ selected }) => selected && `
        background-image: url(${cups.selected});
        top: 6px;
    `};
`;
const IngredientInner = styled.div`
    display: flex;
    flex-direction: column;
    position: relative;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
`;
const IngredientCup = styled.img`
    width: 50px;
    height: 50px;
`;

const brewSounds = new Array(3).fill(false);

    // TODO: Баг. Кнопка меняется на sucess, хотя в cooking стоит fail.     
    // Происходит при переключении по таймеру на fail.
    // ["sucess", "sucess", "fail"] "buttons"
    // ["sucess", "fail", "fail"] "buttons"
    // ["fail", "sucess", "fail"] "buttons"

function CoffeMaschine({ ingCollection, getRecipe }) {

    const [cups, setCups] = React.useState([true, false, false]);
    const [buttons, setButtons] = React.useState(['disabled', 'disabled', 'disabled']);
    const [timer, setTimer] = React.useState(['none', 'none', 'none']);
    const [scoreClick, setScoreClick] = React.useState([false, false, false]);
    const [cooking, setCooking] = React.useState(['start', 'start', 'start']);
    const [ingCupCollection, setIngCupCollection] = React.useState([[], [], []]);

    const [timeout, setTimeout] = React.useState([false, false, false]);

    let audioLocalState = localStorage.getItem('audio');

    let selectCup = new Audio(sound.selectcup);
    let coffeeStop = new Audio(sound.coffeeStop);
    let coffeeStart = new Audio(sound.coffeeStart);
    let answerCorrect = new Audio(sound.answerCorrect);

    const changeButtons = React.useCallback(() => {

        const buttonsState = [];
        const cookingState = [];

        const cookingDataset = getAllElementsWithAttribute('data-cooking');

        cookingDataset.forEach((el, i) => {
            cookingState.push((ingCupCollection[i].length && el.dataset.cooking !== 'ready' && el.dataset.cooking !== 'fail') ? 'active' : el.dataset.cooking)
        })

        cookingState.forEach((el) => {
            buttonsState.push(buttonStateSwitcher(el));
        })

        setIngCupCollection([].concat(ingCupCollection));

        return buttonsState;
    }, [ingCupCollection])

    React.useEffect(() => {
        setButtons([].concat(changeButtons()))
        setIngCupCollection(ingCollection);
    }, [ingCollection, changeButtons])

    function handleClickCup({ target }) {
        const index = target.dataset.index;

        if (cups[index] !== true) { selectCup.play() }
        if (audioLocalState === 'off') { stopPlay(selectCup); }

        (function () {
            const pureCups = new Array(3).fill(false);
            pureCups[index] = true;
            setCups([].concat(pureCups));
        })();
    }

    function makeCoffee({ target }) {
        const buttonIdx = target.dataset.index;

        buttons[buttonIdx] = 'sucess';

        const audioBrew = coffeeBrewAudio(buttonIdx);
        brewSounds[buttonIdx] = audioBrew;

        if (audioLocalState === 'off') {
            stopPlay(coffeeStart)
            stopPlay(audioBrew)
        } else {
            coffeeStart.play();
            audioBrew.play();
        }

        cooking[buttonIdx] = 'ready';
        setCooking([].concat(cooking))

        timer[buttonIdx] = 'block'
        scoreClick[buttonIdx] = true;

        setScoreClick([].concat(scoreClick));
        setButtons([].concat(buttons))
        setTimer([].concat(timer));
    }

    function scoreHandle(e) {
        e.stopPropagation();

        const buttonIdx = e.target.closest('span').dataset.index;
        const cookingActive = getAllElementsWithAttribute('data-cooking');
        let cookingState = cookingActive[buttonIdx].dataset.cooking;

        function resetScore() {
            scoreClick[buttonIdx] = false;
            setScoreClick([].concat(scoreClick));
            resetCup(buttonIdx);
            cookingState = 'start';
            timeout[buttonIdx] = false
            setTimeout([].concat(timeout))
        }
        
        function muteAudioScore(audioObj ) {
            if (audioLocalState === 'off') {
                stopPlay(audioObj)
            } else {
                audioObj.play();
            }
        }

        switch (cookingState) {
            case 'done':
                muteAudioScore(answerCorrect)
                window.clearTimeout(timeout[buttonIdx]);
                getRecipe(ingCupCollection[buttonIdx])
                resetScore();
                break;
            case 'fail':
                muteAudioScore(coffeeStop)
                resetScore();
                break;
            default:
                break;
        }
    }

    function failCupHandle(idx) {
        const cookingActive = getAllElementsWithAttribute('data-cooking');
        cookingActive[idx].dataset.cooking = 'fail';
        buttons[idx] = 'fail'
        setButtons([].concat(buttons));
    }

    function resetCup(idx) {
        clearArray(ingCupCollection, idx);

        cooking[idx] = 'start';
        setCooking([].concat(cooking))

        buttons[idx] = 'disabled';
        setButtons([].concat(buttons));

        timer[idx] = 'none';
        setTimer([].concat(timer));

        window.clearTimeout(timeout[idx]);
        timeout[idx] = false
        setTimeout([].concat(timeout))
    }

    function removeCupIngredients(e) {
        e.stopPropagation();

        if (audioLocalState === 'off') {
            stopPlay(coffeeStop)
        } else {
            coffeeStop.play()
        }

        const cupIdx = e.currentTarget.parentNode.dataset.index;

        if (brewSounds[cupIdx]) {
            stopPlay(brewSounds[cupIdx]);
            brewSounds[cupIdx] = false;
        }

        resetCup(cupIdx);
    }

    function removeIngredientsFrmCup(e) {
        e.stopPropagation();
        coffeeStop.play();
        const cupIdx = e.currentTarget.parentNode.dataset.index;

        const cups = document.querySelectorAll('.cup');
        cups[cupIdx].dataset.cooking = false; 

        rmFrmIngCupCollection(ingCupCollection, cupIdx);
        setIngCupCollection([].concat(ingCupCollection));
        buttons[cupIdx] = 'disabled';
        setButtons([].concat(buttons));

        timer[cupIdx] = 'none';
        setTimer([].concat(timer));
    }

    const CupsList = cups.map((el, i) =>
    (
        <CupsItem
            data-index={i}
            data-active={el}
            data-cooking={cooking[i]}
            key={i.toString()}
            selected={(el) ? true : false}
            onClick={(e) => handleClickCup(e)}
        >
            <IngredientInner onClick={(e) => removeCupIngredients(e)}>
                {ingCupCollection[i].map((val, j) => {
                    return (
                        <IngredientCup
                            key={j.toString()}
                            src={cupIngredients[val]}
                        />
                    );
                })}
            </IngredientInner>

        </CupsItem>
    ))

    const ButtonsList = buttons.map((el, i) => (

        <CoffeMaschineButton
            data-index={i}
            onClick={(el === 'start') ? (e) => makeCoffee(e) : () => () => ''}
            key={i.toString()}
            buttonIcon={buttonIconSwitcher(el)}
        >

            <Timer
                index={i}
                key={i.toString()}
                fail={failCupHandle}
                animation={scoreClick[i]}
                score={(scoreClick[i]) ? () => scoreHandle : () => () => ''}
                show={timer[i]}
                timeout={timeout}
            />

        </CoffeMaschineButton>
    ))

    return (

        <CoffeMaschineWrapper>
            <CoffeMaschineOuter>

                <CoffeMaschineButtonsInner>
                    {ButtonsList}
                </CoffeMaschineButtonsInner>

                <CoffeMaschineCupsInner>
                    <CupsInner>
                        {CupsList}
                    </CupsInner>
                    <CoffeMaschineBorder />
                </CoffeMaschineCupsInner>

            </CoffeMaschineOuter>
        </CoffeMaschineWrapper>

    );
}

CoffeMaschine.propTypes = {
    ingCollection: PropTypes.array,
}

export default CoffeMaschine;