/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import Modal from 'react-modal';
import { sound, recipeEndConfirm, helpText, audioLocalState, modalImg } from '../../constants/index'
import Sound from 'react-sound';

Modal.setAppElement('#root')

const HudWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
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

function Options({ recipeCount, score }) {

    const [fullscreen, setFullscreen] = React.useState(true)
    const [modalIsOpen, setIsOpen] = React.useState(true)
    const [playing, setPlaying] = React.useState(false)

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

        <HudWrapper>

            {/* <Sound
                url={sound.guitarRadioAmbienceLoop}
                playStatus={(playing) ? Sound.status.PLAYING : Sound.status.STOPPED}
                loop={true}
            /> */}

            {/* <Dropdown
                arrowClosed={arrowEmpty}
                arrowOpen={arrowEmpty}
                onChange={(option) => dropDownHandle(option)}
                controlClassName='menu-dropdown-control'
                menuClassName='menu-dropdown-link'
                options={dropDownOptions}
                placeholder="Menu" /> */}

            {/* <HudOuter cursor={'pointer'} onClick={() => setPlaying(!playing)}>
                <HudText>Music</HudText>
                <HudText>{playing ? 'on' : 'off'}</HudText>
            </HudOuter> */}

            {/* <HudOuter width={'100px'} cursor={'pointer'} onClick={soundFXHandle}>
                <HudText>Sound</HudText>
                <HudText>{soundFX ? 'off' : 'on'}</HudText>
            </HudOuter> */}

            <HudInner cursor='pointer'>
                <HudText>Menu</HudText>
            </HudInner>

            <HudOuter>
                <HudInner width={'120px'}>
                    <HudText>Orders</HudText>
                    <HudText>{recipeCount}</HudText>
                </HudInner>

                <HudInner>
                    <HudText>Score</HudText>
                    <HudText>{score}</HudText>
                </HudInner>
            </HudOuter>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setIsOpen(false)}
                overlayClassName='overlay'
            >
                <ModalButtonWrapper>

                    <ModalButtonClose onClick={() => setIsOpen(false)}>
                        <ModalButtonCloseImg src={modalImg.CrossImg} />
                    </ModalButtonClose>

                </ModalButtonWrapper>
                <MaschineImg src={modalImg.MaschineImg} />
                <ModalContentWrapper>
                    {helpText}
                </ModalContentWrapper>
            </Modal>

        </HudWrapper>
    );
}

Options.propTypes = {
    recipeCount: PropTypes.number,
    score: PropTypes.number,
}

export default Options;