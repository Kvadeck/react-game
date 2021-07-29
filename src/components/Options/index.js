/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { sound, recipeEndConfirm, helpText, audioLocalState, modalImg } from '../../constants/index'
import bgImage from '../../assets/optionsBg.png'
import CrossImg from '../../assets/cross.png'

const OptionsWrapper = styled.div`  
    display: flex;
    width: 100%;
    height: 100%;
    position: absolute;
`;

const OptionsOverlay = styled.div`  
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

const OptionsModal = styled.div`  
    width: 500px;
    height: 500px;
    background: white;
    z-index: 101;
    position: absolute;
    left: 0;
    right: 0;
    margin: 0 auto;
    border-radius: 10px;
    transform: translate(0, -500px);

    ${({ flag }) => flag && `
        transform: translate(0, 55px);
    `}

    transition: transform .3s .3s linear;
`;

const CloseOptions = styled.div`  
    position: absolute;
    top: 5px;
    right: 6px;
    width: 28px;
    height: 28px;
    cursor: pointer;
    opacity: .7;
    border-radius: 50%;
    border: 2px solid black;
    z-index: 101;
    &:hover {
        span {
            transform: rotate(180deg);
        }
    }
`;

const Cross = styled.span`  
    position: absolute;
    background-image:url(${CrossImg});
    width: 12px;
    height: 12px;
    position: absolute;
    left: 6px;
    top: 6px;
    transition: transform .25s;
`;

const OptionsTitle = styled.span`  
    position: absolute;
    font-size: 3rem;
    color: #4f4f4f;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    width: 100%;
    top: 4px;
`;

const HudOuter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
`;
const HudInner = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: relative;
  background: white;
  opacity: .4;
  height: 30px;
  width: ${({ width }) => width || "100px"};
  margin: 0 1px;
  padding: 0 10px;
  cursor: ${({ cursor }) => cursor || "initial"};
`;
const HudText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;
`;
const ModalButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-bottom: 10px;
`;
const ModalButtonClose = styled.a`
  cursor: pointer;
`;
const ModalContentWrapper = styled.div`
  display: flex;
  font-family: 'Rotonda Regular', sans-serif;
  font-size: 1.4rem;
  margin: 20px;
  line-height: 1.5;
`;
const MaschineImg = styled.img`
    width: auto;
    height: auto;
    margin-bottom: 10px;
    margin-left: 20px;
`;
const ModalButtonCloseImg = styled.img`
    width: 20px;
    height: 20px;
`;

// !TODO: Отказаться от библиотек с выпадающим списком и модальным окном
// TODO: Сделать переключение нескольких языков
// TODO: Поменять дизайн. Сгрупировать все опции в отдельное открывающиеся окно

function Options({toogleOptions}) {
    
    const [modalFlag, setModalFlag] = React.useState(false)

    React.useEffect(() => {
        if (toogleOptions) {
            setModalFlag(toogleOptions)
        }
    }, [toogleOptions])

    // const [playing, setPlaying] = React.useState(false)

    // const [soundFX, setSoundFX] = React.useState((audioLocalState === 'off') ? true : false)

    // function soundFXHandle() {
    //     localStorage.setItem('audio', (!soundFX) ? 'off' : 'on')
    //     return setSoundFX(!soundFX)
    // }

    // const toggleFullScreenHandle = () => {
    //     setFullscreen(!fullscreen)
    //     if (fullscreen) {
    //         document.documentElement.requestFullscreen();
    //     } else {
    //         document.exitFullscreen();
    //     }
    // };

    // const dropDownOptions = [
    //     'New', 'Fullscreen', 'Help'
    // ];

    // function dropDownHandle(option) {
    //     let newOption, fullScreenOption, helpOption
    //     [newOption, fullScreenOption, helpOption] = [...dropDownOptions]

    //     if (option.label === newOption) {
    //         document.location.reload()
    //     }
    //     else if (option.label === fullScreenOption) {
    //         toggleFullScreenHandle()
    //     }
    //     else if (option.label === helpOption) {
    //         setIsOpen(true)
    //     }
    // }

    return (

        <OptionsWrapper>

            <OptionsOverlay flag = {modalFlag}/>

            <OptionsModal flag = {modalFlag}>
                    <CloseOptions onClick={()=>setModalFlag(!modalFlag)}>
                        <Cross/>
                    </CloseOptions>
                    <OptionsTitle>Options</OptionsTitle>
                    
            </OptionsModal>

        </OptionsWrapper>

        /* <Sound
            url={sound.guitarRadioAmbienceLoop}
            playStatus={(playing) ? Sound.status.PLAYING : Sound.status.STOPPED}
            loop={true}
        /> */

        /* <HudOuter cursor={'pointer'} onClick={() => setPlaying(!playing)}>
            <HudText>Music</HudText>
            <HudText>{playing ? 'on' : 'off'}</HudText>
            </HudOuter> */

        /* <HudOuter width={'100px'} cursor={'pointer'} onClick={soundFXHandle}>
            <HudText>Sound</HudText>
            <HudText>{soundFX ? 'off' : 'on'}</HudText>
        </HudOuter> */

    );
}

Options.propTypes = {
    toogleOptions: PropTypes.bool
}

export default Options;