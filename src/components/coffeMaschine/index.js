import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';
import { rmFrmIngCupCollection, buttonIconSwitcher } from '../helpers/index'
import Handle from '../../assets/expresso/handle/handle.png';
import { cups, sound, cupIngredients, cookingTimer } from '../../constants/index'
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

// TODO: Если хоть один ингредиент есть в стакане и было переключение на другой стакан. То у этого стакана доступно только удаление.

function CoffeMaschine({ ingCollection }) {

    const [cups, setCups] = React.useState([true, false, false]);
    const [buttons, setButtons] = React.useState(['disabled', 'disabled', 'disabled']);
    const [timer, setTimer] = React.useState(['none', 'none', 'none']);
    const [scoreClick, setScoreClick] = React.useState([false, false, false]);

    const [ingCupCollection, setIngCupCollection] = React.useState([[], [], []]);

    let selectCup = new Audio(sound.selectcup);
    let coffeeStop = new Audio(sound.coffeeStop);
    let coffeeStart = new Audio(sound.coffeeStart);
    let answerCorrect = new Audio(sound.answerCorrect);

    const setActiveButtons = React.useCallback(() => {
        const buttonsActive = [];
        const sucessIdx = [];

        buttons.forEach((el, i) => {
            if (el === 'sucess') { sucessIdx.push(i) }
        })

        ingCupCollection.forEach((arr, i) => {
            if (Array.isArray(arr) && arr.length) {
                buttonsActive.push('start');
            } else {
                buttonsActive.push('disabled');
            }
        });
        if (sucessIdx.length) {
            sucessIdx.forEach((idx) => {
                buttonsActive[idx] = 'sucess';
            })
        }

        return buttonsActive;
    }, [ingCupCollection])


    React.useEffect(() => {

        setButtons([].concat(setActiveButtons()))
        setIngCupCollection(ingCollection);

    }, [ingCollection, setActiveButtons])

    function handleClickCups({ target }) {
        const index = target.dataset.index;
        if (cups[index] !== true) { selectCup.play(); }
        (function () {
            const pureCups = new Array(3).fill(false);
            pureCups[index] = true;
            setCups(pureCups.slice());
        })();
    }

    function makeCoffee({ target }) {
        const buttonIdx = target.dataset.index;
        buttons[buttonIdx] = 'sucess';
        coffeeStart.play();

        const cups = document.querySelectorAll('.cup');
        cups[buttonIdx].dataset.cooking = true;
        timer[buttonIdx] = 'block'
       
        setButtons([].concat(buttons))
        setIngCupCollection([].concat(ingCupCollection));
        setTimer([].concat(timer));
       
        scoreClick[buttonIdx] = true;
        setScoreClick([].concat(scoreClick));

    }

    function scoreHandle(e) {
        e.stopPropagation();
        answerCorrect.play();
        console.log('Coffee is done');
        // TODO: Сбросить в исходное состояние этот стакан
        // TODO: Поставить state из другова компонента по принадлежности в исходное состояние 
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
            className='cup'
            data-index={i}
            data-active={el}
            key={i.toString()}
            selected={(el) ? true : false}
            onClick={(e) => handleClickCups(e)}
        >
            <IngredientInner onClick={(e) => removeIngredientsFrmCup(e)}>
                {ingCupCollection[i].map((val, j) => {
                    return (
                        <IngredientCup key={j.toString()} src={cupIngredients[val]} />
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
            buttonIcon={buttonIconSwitcher(el)}>
                
                <Timer score = {(scoreClick[i]) ? () => scoreHandle : () => () => ''} show = {timer[i]}/>
                
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