/* eslint-disable no-restricted-globals */
import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';
import Modal from 'react-modal';
import MaschineImage from '../../assets/help.jpg';
import CrossImage from '../../assets/cross.png';
import { recipeEndConfirm, helpText } from '../../constants/index'

const HudWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  position: relative;
  margin-bottom: 30px;
`;
const HudOuter = styled.div`
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
  font-size: 1.2rem;
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
  font-size: 1.4rem;
  margin: 20px;
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

Modal.setAppElement('#root')

function Hud({ recipeCount, score, toggleAmbienceSound, playing, soundSwitch, allSound }) {

    const [fullscreen, setFullscreen] = React.useState(true);
    const [modalIsOpen, setIsOpen] = React.useState(false);

    const modalStyles = {
        content: {
            width: '500px',
            height: 'fit-content',
            margin: '0 auto',
        }
    };

    React.useEffect(() => {
        if (!recipeCount) {
            confirm(recipeEndConfirm);
            document.location.reload();
        }
    }, [recipeCount])

    function openModalHandle() {
        setIsOpen(true);
    }

    function closeModalHandle() {
        setIsOpen(false);
    }

    const toggleFullScreenHandle = () => {
        setFullscreen(!fullscreen)
        if (fullscreen) {
            document.documentElement.requestFullscreen();
        } else {
            document.exitFullscreen();
        }
    };

    const arrowEmpty = (
        <span />
    )

    const dropDownOptions = [
        'New', 'Fullscreen', 'Help'
    ];

    function dropDownHandle(option) {
        let newOption, fullScreenOption, helpOption;
        [newOption, fullScreenOption, helpOption] = [...dropDownOptions];

        if (option.label === newOption) {
            document.location.reload();
        }
        else if (option.label === fullScreenOption) {
            toggleFullScreenHandle();
        }
        else if (option.label === helpOption) {
            openModalHandle();
        }
    }

    return (

        <HudWrapper>

            <Dropdown
                arrowClosed={arrowEmpty}
                arrowOpen={arrowEmpty}
                onChange={(option) => dropDownHandle(option)}
                controlClassName='menu-dropdown-control'
                menuClassName='menu-dropdown-link'
                options={dropDownOptions}
                placeholder="Menu" />

            <HudOuter cursor={'pointer'} onClick={() => toggleAmbienceSound()}>
                <HudText>music</HudText>
                <HudText>{playing ? 'on' : 'off'}</HudText>
            </HudOuter>

            <HudOuter width={'100px'} cursor={'pointer'} onClick={soundSwitch}>
                <HudText>sound</HudText>
                <HudText>{allSound ? 'off' : 'on'}</HudText>
            </HudOuter>
            <HudOuter width={'120px'}>
                <HudText>orders</HudText>
                <HudText>{recipeCount}</HudText>
            </HudOuter>
            <HudOuter>
                <HudText>score</HudText>
                <HudText>{score}</HudText>
            </HudOuter>

            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModalHandle}
                contentLabel="Example Modal"
                style={modalStyles}
                overlayClassName='overlay'
            >
                <ModalButtonWrapper>

                    <ModalButtonClose onClick={closeModalHandle}>
                        <ModalButtonCloseImg src={CrossImage} />
                    </ModalButtonClose>

                </ModalButtonWrapper>
                <MaschineImg src={MaschineImage} />
                <ModalContentWrapper>
                    {helpText}
                </ModalContentWrapper>
            </Modal>

        </HudWrapper>
    );
}

Hud.propTypes = {
    recipeCount: PropTypes.number,
    score: PropTypes.number,
    toggleAmbienceSound: PropTypes.func,
    playing: PropTypes.bool,
    soundSwitch: PropTypes.func,
    allSound: PropTypes.bool
}

export default Hud;