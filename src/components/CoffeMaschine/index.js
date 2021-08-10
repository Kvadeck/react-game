import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components'
import Handle from '../../assets/expresso/handle/handle.png';
import { buttonIconSwitcher, getAllElementsWithAttribute, stopPlay, buttonStateSwitcher } from '../../helpers'
import { soundAssets, cupIngredients, cookingState, active, cupsIds, ingCupIds, buttonsIds, timerIds } from '../../constants'
import Timer from '../Timer'
import { newCupSelect } from '../../helpers'
import Sound from 'react-sound'

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
    background-color: var(--coffemaschineouter);
`;
const CoffeMaschineCupsInner = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    border-radius: 2px 2px 0 0;
    min-height: 200px;
    z-index: 1;
    justify-content: flex-end;
    flex-direction: column;
    border-bottom: var(--coffemaschinecupsouter) 1rem solid;
    background-color: var(--coffemaschinecupsinner);
`;
const CoffeMaschineBorder = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    height: 6px;
    background-color: var(--border-bottom-coffemaschinecupsinner);
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
    background-color: var(--background-coffemaschinebuttonsinner);
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
const CupInner = styled.div`
    position: relative;
    display: flex;
    align-items: flex-end;
    top: 0;
`;
const CupsItem = styled.div`
    
    position: relative;
    width: 71px;
    border-top: 79px solid #F5F5F5;
    border-left: 11px solid transparent;
    border-right: 9px solid transparent;

    ${({ ingredient }) => ingredient && `
        border-top: 125px solid #F5F5F5;
    `};

    ${({ selected }) => selected && `
        border-radius: 10% 10% 37% 41%;
    `};

    &::before {
        content: '';
        position: absolute;
        background: #F5F5F5;
        width: 80px;
        height: 10px;
        bottom: 80px;
        left: -15px;
        border-radius: 3px 3px 0 0;
        box-shadow: 0 2px 0 rgb(233 232 227);
        transition: box-shadow .1s linear;

        ${({ ingredient }) => ingredient && `
            bottom: 127px;
        `};

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
    display: block;
    opacity:0;
    visibility: hidden;
    transition: opacity .1s linear;
    
    ${({ selected }) => selected && `
        opacity: 1;
        visibility: visible;
    `};

    width: 65px;
    height: 30px;
    left: -9px;
    bottom: 73px;
    border-radius: 50%;
    position: absolute;
    background-color: #eacdcd;

    &::before {
        content: '';
        border-bottom: 16px solid #fedfe0;
        border-left: 5px solid transparent;
        border-right: 4px solid transparent;
        height: 0;
        width: 22px;
        position: absolute;
        left: 31px;
        top: 6.9px;
        display: block;
        transform: rotate(88deg);
        border-radius: 2px 3px 0 0;
    }

`;
const CupsShadow = styled.div`
    
    position: absolute;
    width: 83px;
    margin-left: -6px;
    top: calc(100% - 87px);
    border-radius: 5px;
    border-top: 91px solid rgb(0 0 0 / 10%);

    ${({ ingredient }) => ingredient && `
        top: 1px;
        border-top: 128px solid rgb(0 0 0 / 10%);
        border-radius: initial;
    `};

    border-left: 11px solid transparent;
    border-right: 9px solid transparent;
    
    ${({ selected }) => selected && `
        border-radius: 10% 10% 37% 41%;
    `};
    
    &::before {
        content: '';
        position: absolute;
        left: -15px;
        bottom: 81px;
        width: 91px;
        height: 18px;
        border-radius: 8px 8px 0 0;
        background-color: rgb(0 0 0 / 10%);

        ${({ ingredient }) => ingredient && `
            bottom: 128px;
        `};

        ${({ selected }) => selected && `
            background-color: transparent;
        `};
    }
`;
const IngredientInner = styled.div`
    display: flex;
    flex-direction: column;
    position: absolute;
    bottom: 15px;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 4;
`;
const IngredientCup = styled.img`
    width: 50px;
    height: 50px;
`;
const Trash = styled.span`
	position: absolute;
    display: inline-block;
    width: 34px;
    height: 42px;
    margin: 0 auto;
    background: #ff5722;
    left: 18px;
    opacity: 0;
    bottom: 23px;
    border-bottom-right-radius: 6px;
    border-bottom-left-radius: 6px;
`;
const TrashCap = styled.span`
	position: absolute;
    height: 7px;
    background: #ff5722;
    top: -9px;
    left: -4px;
    right: -4px;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    transform: rotate(0deg);
    transition: transform 250ms;
    transform-origin: 19% 100%;

    &::after {
        content: '';
        position: absolute;
        width: 14px;
        height: 5px;
        background: #ff5722;
        top: -6px;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
        transform: rotate(0deg);
        transition: transform 250ms;
        transform-origin: 19% 100%;
        left: 14px;
    }
`;
const TrashBody = styled.span`
	
    position: relative;
    width: 3px;
    height: 23px;
    background: #fff;
    display: block;
    margin: 9px auto;
    border-radius: 5px;

    &::before {
        content: '';
        width: 3px;
        height: 23px;
        background: #fff;
        position: absolute;
        right: -9px;
        border-radius: 5px;
    }

    &::after {
        content: '';
        width: 3px;
        height: 23px;
        background: #fff;
        position: absolute;
        left: -9px;
        border-radius: 5px;
    }

`;

// TODO: Баг. Кнопка меняется на sucess, хотя в cooking стоит fail.     
// Происходит при переключении по таймеру на fail.
// ["sucess", "sucess", "fail"] "buttons"
// ["sucess", "fail", "fail"] "buttons"
// ["fail", "sucess", "fail"] "buttons"

function CoffeMaschine({ ingCollection, getRecipe, selectedCups, setSelectedCups, cupsViewState, setCupsViewState, cupWithIngredient, setCupWithIngredient }) {

    const [buttons, setButtons] = React.useState(['disabled', 'disabled', 'disabled'])
    const [timer, setTimer] = React.useState(['none', 'none', 'none'])
    const [scoreClick, setScoreClick] = React.useState([false, false, false])
    const [cooking, setCooking] = React.useState(['start', 'start', 'start'])
    const [ingCupCollection, setIngCupCollection] = React.useState([[], [], []])
    
    const [brewSounds, setBrewSounds] = React.useState([false, false, false])

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

    // TODO: После выключения звука, один раз звук срабатывает.
    function clickCupHandle({ target }) {
        const cupIdx = (target.id === '') ? target.parentNode.id : target.id

        // Cup circle click
        if (cupIdx === '') return

        // One ingredient inside a cup
        else if (ingCollection[cupIdx].length) return

        // Local storage sound and active cup
        if (audioLocalState !== 'off' && selectedCups[cupIdx] !== true) {
            selectCup.play()
        }

        // Reset to false and change to active
        setSelectedCups([].concat(newCupSelect(cupIdx, selectedCups)))
        setCupsViewState([].concat(newCupSelect(cupIdx, cupsViewState)))

        return cupIdx
    }

    function makeCoffee() {
        return function ({ target }) {
            const buttonIdx = target.dataset.index;

            buttons[buttonIdx] = 'sucess';

            if (localStorage.getItem('audio') !== 'off') {
                brewSounds[buttonIdx] = true
                setBrewSounds([].concat(brewSounds))
                coffeeStart.play(); 
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

        ingCupCollection[idx] = []
        setIngCupCollection([].concat(ingCupCollection))

        setSelectedCups([].concat(newCupSelect(idx, selectedCups)))
        setCupsViewState([].concat(newCupSelect(idx, cupsViewState)))
        setCupWithIngredient([].concat(newCupSelect(idx, cupWithIngredient, false)))

        cooking[idx] = 'start'
        setCooking([].concat(cooking))

        buttons[idx] = 'disabled'
        setButtons([].concat(buttons))

        timer[idx] = 'none';
        setTimer([].concat(timer))

        window.clearTimeout(timeout[idx])
        timeout[idx] = false
        setTimeout([].concat(timeout))
    }

    function removeCupIngredients(e) {
        e.stopPropagation()

        if (localStorage.getItem('audio') !== 'off') {
            coffeeStop.play()
        }

        const cupItem = e.currentTarget.parentNode
        const cupWrap = cupItem.parentNode

        // Stop coffee brew sound when remove ingredient
        brewSounds[cupWrap.id] = false
        setBrewSounds([].concat(brewSounds))

        resetCup(cupWrap.id)
    }

    const CupsList = cupsViewState.map((el, i) =>
    (
        <CupInner id={i} key={cupsIds[i].id} onClick={(e) => clickCupHandle(e)}>

            <CupsShadow ingredient={(cupWithIngredient[i]) ? true : false} selected={(el) ? true : false} />

            <CupsItem
                data-cooking={cooking[i]}
                selected={(el) ? true : false}
                ingredient={(cupWithIngredient[i]) ? true : false}
            >
            <Sound
                url={soundAssets.coffeeBrew}
                playStatus={(brewSounds[i]) ? Sound.status.PLAYING : Sound.status.STOPPED}
            />
                <CupsItemCircle selected={(el) ? true : false} />

                <IngredientInner onClick={(e) => removeCupIngredients(e)}>
                    {ingCupCollection[i].map((val, j) => {
                        return (
                            <IngredientCup
                                key={ingCupIds[j].id}
                                src={cupIngredients[val]}
                            />
                        )
                    })}
                </IngredientInner>

            </CupsItem>

            <Trash>
                <TrashCap/>
                <TrashBody/>
            </Trash>

        </CupInner>

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