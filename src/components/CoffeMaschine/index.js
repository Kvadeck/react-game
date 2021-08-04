import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Handle from '../../assets/expresso/handle/handle.png';
import { buttonIconSwitcher, getAllElementsWithAttribute, coffeeBrewAudio, stopPlay, buttonStateSwitcher } from '../../helpers'
import { cups, soundAssets, cupIngredients, cookingState, active, cupsIds, ingCupIds, buttonsIds, timerIds } from '../../constants'
import Timer from '../Timer'


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
const CupsOuter = styled.div`
   position: relative;
   display: flex;
   justify-content: space-between;
   margin: 0 24px;
   z-index: 2;
`;

const CupsInner = styled.div`
   display: flex;
   justify-content: space-between;
`;

const CupsItem = styled.div`
    
    position: relative;
    width: 71px;
    border-top: 100px solid #F5F5F5;
    border-left: 11px solid transparent;
    border-right: 9px solid transparent;

    ${({ selected }) => selected && `
        border-radius: 10% 10% 37% 41%;
    `};

    &::before {
        content: '';
        position: absolute;
        background: #F5F5F5;
        width: 80px;
        height: 10px;
        bottom: 96px;
        left: -15px;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 2px 0 rgb(233 232 227);

        ${({ selected }) => selected && `
            width: 82px;
            height: 46px;
            bottom: 61px;
            left: -16px;
            border-radius: 46%;
            box-shadow: 0 1px 0 rgb(233 232 227), 0px 1px 0 5px rgb(0 0 0 / 10%);
        `};
    }
`;
const CupsItemCircle = styled.span`
    display: none;
    opacity:0;
    transition: opacity .2s linear;
    
    ${({ selected }) => selected && `
        display: block;
        opacity: 1;
    `};
    width: 65px;
    height: 30px;
    left: -9px;
    bottom: 73px;
    border-radius: 50%;
    position: absolute;
    background-color: #eacdcd;

    &::before {
        border-bottom: 16px solid #fedfe0;
        border-left: 5px solid transparent;
        border-right: 4px solid transparent;
        height: 0;
        width: 22px;
        position: absolute;
        left: 31px;
        top: 6.9px;
        content: '';
        display: block;
        transform: rotate(88deg);
        border-radius: 2px 3px 0 0;
    }

`;
const CupsShadow = styled.div`
    
    position: absolute;
    width: 83px;
    top: 8px;
    margin-left: -6px;
    border-top: 96px solid rgb(0 0 0 / 10%);
    border-left: 11px solid transparent;
    border-right: 9px solid transparent;

    ${({ selected }) => selected && `
        border-radius: 10% 10% 37% 41%;
    `};
    
    &::before {
        content: '';
        width: 91px;
        height: 19px;
        bottom: 96px;
        left: -15px;
        border-radius: 8px 8px 0 0;
        position: absolute;
        background-color: rgb(0 0 0 / 10%);

        ${({ selected }) => selected && `
            background-color: transparent;
        `};

    }
`;
const IngredientInner = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
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

function CoffeMaschine({ ingCollection, getRecipe, cups, setCups }) {

    const [buttons, setButtons] = React.useState(['disabled', 'disabled', 'disabled'])
    const [timer, setTimer] = React.useState(['none', 'none', 'none'])
    const [scoreClick, setScoreClick] = React.useState([false, false, false])
    const [cooking, setCooking] = React.useState(['start', 'start', 'start'])
    const [ingCupCollection, setIngCupCollection] = React.useState([[], [], []])

    const [timeout, setTimeout] = React.useState([false, false, false])

    let audioLocalState = localStorage.getItem('audio')

    let selectCup = new Audio(soundAssets.selectcup)
    let coffeeStop = new Audio(soundAssets.coffeeStop)
    let coffeeStart = new Audio(soundAssets.coffeeStart)
    let answerCorrect = new Audio(soundAssets.answerCorrect)

    React.useEffect(() => {

        function changeButtons() {

            const cookingDataset = getAllElementsWithAttribute('data-cooking');
            const { fail, ready } = cookingState;

            setIngCupCollection([].concat(ingCupCollection));

            return cookingDataset
                .reduce((prev, curr, i) => {
                    prev.push((ingCupCollection[i].length && curr.dataset.cooking !== ready && curr.dataset.cooking !== fail) ? active : curr.dataset.cooking)
                    return prev;
                }, [])
                .reduce((prev, curr) => {
                    prev.push(buttonStateSwitcher(curr))
                    return prev;
                }, [])
        }

        setButtons([].concat(changeButtons()))
        setIngCupCollection(ingCollection);
    }, [ingCollection, ingCupCollection])

    function handleClickCup({ target }) {
        const index = target.dataset.index

        if (cups[index] !== true && audioLocalState !== 'off') {
            selectCup.play()
        }

        const pureCups = new Array(3).fill(false)
        pureCups[index] = true
        setCups([].concat(pureCups))
    }

    function makeCoffee() {
        return function ({ target }) {
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

        function muteAudioScore(audioObj) {
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

        const cleared = [...ingCupCollection.slice(0, idx), ...ingCupCollection.slice(idx + 1)]
        console.log(cleared);

        ingCupCollection[idx] = [];
        setIngCupCollection([].concat(ingCupCollection))

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

    const CupsList = cups.map((el, i) =>
    (


        <CupsInner>

            <CupsShadow selected={(el) ? true : false} />

            <CupsItem
                data-index={i}
                data-cooking={cooking[i]}
                key={cupsIds[i].id}
                selected={(el) ? true : false}
                onClick={(e) => handleClickCup(e)}
            >

                <CupsItemCircle selected={(el) ? true : false} />

                <IngredientInner onClick={(e) => removeCupIngredients(e)}>
                    {ingCupCollection[i].map((val, j) => {
                        return (
                            <IngredientCup
                                key={ingCupIds[j].id}
                                src={cupIngredients[val]}
                            />
                        );
                    })}
                </IngredientInner>

            </CupsItem>
        </CupsInner>





    ))

    const ButtonsList = buttons.map((el, i) => (

        <CoffeMaschineButton
            data-index={i}
            onClick={(el === 'start') ? makeCoffee() : () => ''}
            key={buttonsIds[i].id}
            buttonIcon={buttonIconSwitcher(el)}
        >

            <Timer
                index={i}
                key={timerIds[i].id}
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
                    <CupsOuter>
                        {CupsList}
                    </CupsOuter>
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