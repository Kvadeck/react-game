import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';

import ServeEnabledBtn from '../../assets/expresso/buttons/serveEnabled.png';
import Handle from '../../assets/expresso/handle/handle.png';

import {cups} from '../../constants/index'

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
    position: relative;
    width: 92px;
    height: 108px;
    cursor: pointer;
    z-index: 4;
    background-image: url(${cups.normal});
    ${({ selected }) => selected && `
        background-image: url(${cups.selected});
        top: 6px;
    `};
`;

function CoffeMaschine() {
    let audio = new Audio("/sound/cupMove.mp3");
    const [cups, setCups] = React.useState([false, true, false]);

    function handleClickCups({target}) {
        const pureCups = new Array(3).fill(false);
        pureCups[target.id] = true;
        audio.play();
        setCups(pureCups.slice());
    }

    const CupsList = cups.map((el, i) =>
    (
        <CupsItem
            id={i}
            key={i.toString()}
            selected={(el) ? true: false}
            onClick= {(e) => handleClickCups(e)}
        />
    ))

    return (

        <CoffeMaschineWrapper>
            <CoffeMaschineOuter> 
                <CoffeMaschineButtonsInner>
                    <CoffeMaschineButton buttonIcon={ServeEnabledBtn} />
                    <CoffeMaschineButton buttonIcon={ServeEnabledBtn} />
                    <CoffeMaschineButton buttonIcon={ServeEnabledBtn} />
                </CoffeMaschineButtonsInner>
                
                <CoffeMaschineCupsInner>
                    <CupsInner>
                        {CupsList}
                    </CupsInner>
                    <CoffeMaschineBorder/>
                </CoffeMaschineCupsInner>

            </CoffeMaschineOuter>
        </CoffeMaschineWrapper>

    );
}

// Inner.propTypes = {
//     justifyContent: PropTypes.string,
//     maxWidth: PropTypes.string
// }

export default CoffeMaschine;