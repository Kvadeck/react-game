import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';

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
        animation: left 5s linear both;
    `};
    
    ${({ right }) => right && `
        z-index: 3;
        animation: right 5s linear both;
        animation-delay: 5s;
    `};
`;

function Timer({show, score}) {

    const [endOfAnimation, setEndOfAnimation] = React.useState(false);

    return (
        <LoadingWrapper onClick={(endOfAnimation) ? score(): () => '' } show={show}>
            <Hold left={true}>
                <Fill left={true}/>
            </Hold>
            <Hold onAnimationEnd={() => setEndOfAnimation(true)} right={true}>
                <Fill right={true}/>
            </Hold>
        </LoadingWrapper>
    );
}

Timer.propTypes = {
    show: PropTypes.string,
    score: PropTypes.func,
}

export default Timer;