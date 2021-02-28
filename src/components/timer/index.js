import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';
import { getAllElementsWithAttribute } from '../helpers/index'
import { failTime } from "../../constants/index";

const LoadingWrapper = styled.div`
  width: 60px;
  height: 60px;
  margin: 20px auto;
  position: relative;
  display: ${({ show }) => show || "none"};
  z-index: 10;
`;
const Hold = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    clip: rect(0px, 65px, 65px, 30px);
    border-radius: 100%;
    background-color: #fff0;

    ${({ left }) => left && ``};

    ${({ right }) => right && `
        z-index: 3;
        transform: rotate(180deg);
    `};

`;
const Fill = styled.div`
    position: absolute;
    width: 100%;
    height: 100%;
    opacity: .7;
    background-color: #f50;
    border-radius: 100%;
    clip: rect(0px, 65px, 60px, 30px);

    ${({ left }) => left && `
        z-index: 1;
        animation: left 2.8s linear both;
    `};
    
    ${({ right }) => right && `
        z-index: 3;
        animation: right 2.8s linear both;
        animation-delay: 2.8s;
    `};
`;

function Timer({ show, score, fail, index, animation, timeout }) {
    
    const [timeoutIn, setTimeoutIn] = React.useState([false, false, false]);

    React.useEffect(() => {
        setTimeoutIn(timeout);
    }, [timeout])

    function setCookingDone(idx) {
        const cookingActive = getAllElementsWithAttribute('data-cooking');
        cookingActive[idx].dataset.cooking = 'done';
        timeoutIn[idx] = window.setTimeout(fail.bind(window, idx), failTime);
        setTimeoutIn([].concat(timeoutIn));
    }

    return (
        <LoadingWrapper onClick={score()} show={show}>
            <Hold left={true}>
                <Fill left={true} />
            </Hold>
            <Hold 
                onAnimationEnd={(animation) ? () => setCookingDone(index) : () => ''} 
                right={true}>

                <Fill right={true} 
                />
            </Hold>
        </LoadingWrapper>
    );
}

Timer.propTypes = {
    show: PropTypes.string,
    score: PropTypes.func,
}

export default Timer;