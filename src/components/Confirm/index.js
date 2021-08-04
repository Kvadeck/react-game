/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { recipeEndConfirm } from '../../constants'

const Wrapper = styled.div`  
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
`;
const Overlay = styled.div`  
    position: absolute;
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
    
    background: black;
    z-index: 100;
    opacity: 0;
    transition: opacity .3s ease-in, visibility .3s linear;
    visibility: hidden;

    ${({ flag }) => flag && `
        opacity: .4;
        visibility: visible;
    `}
`;
const Modal = styled.div`  
    width: 290px;
    height: 220px;
    background: white;
    z-index: 101;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    transform: translate(0, -500px);
    ${({ flag }) => flag && `
        transform: translate(0, 100px);
    `}
    transition: transform .3s .3s linear;
`;
const Title = styled.span`  
    position: absolute;
    font-size: 3rem;
    color: #4f4f4f;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    width: 100%;
    top: 20px;
`;
const EndText = styled.span`  
    font-size: 1.5rem;
    position: absolute;
    top: 80px;
    text-align: center;
    color: #f44336;
`;
const ConfirmBtn = styled.button`  
    font-size: 2rem;
    width: 100px;
    height: 40px;
    position: absolute;
    top: 135px;
    left: 0;
    right: 0;
    margin: 0 auto;
    cursor: pointer;
    text-transform: uppercase;
    color: #4f4f4f;
`;

function Confirm({ recipeCount }) {

    const [modalFlag, setModalFlag] = React.useState(false)

    React.useEffect(() => {
        if (!recipeCount) setModalFlag(true)
        return
    }, [recipeCount])

    const newGameHandle = () => location.reload()

    return (
        <Wrapper>
            <Overlay flag={modalFlag} />
            <Modal flag={modalFlag}>
                <Title>End</Title>
                <EndText>{recipeEndConfirm}</EndText>
                <ConfirmBtn onClick={() => newGameHandle()}>ok</ConfirmBtn>
            </Modal>
        </Wrapper >
    );
}

Confirm.propTypes = {
    recipeCount: PropTypes.any
}

export default Confirm;