import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';
import { storeAudio } from '../../helpers/index'

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

function Hud({ recipeCount, score, toggleAmbienceSound, playing }) {

    let audioLocalState = localStorage.getItem('audio') || 'off';
    const [sound, setSound] = React.useState((audioLocalState === 'off') ? true : false);

    function soundSwitchHandle() {
        storeAudio(!sound);
        setSound(!sound);
    }

    return (
        <HudWrapper>
            <HudOuter cursor={'pointer'}>
                <HudText>menu</HudText>
            </HudOuter>
            <HudOuter cursor={'pointer'} onClick={() => toggleAmbienceSound()}>
                <HudText>music</HudText>
                <HudText>{playing ? 'on' : 'off'}</HudText>
            </HudOuter>
            <HudOuter width={'100px'} cursor={'pointer'} onClick={() => soundSwitchHandle()}>
                <HudText>sound</HudText>
                <HudText>{sound ? 'off' : 'on'}</HudText>
            </HudOuter>
            <HudOuter width={'120px'}>
                <HudText>orders</HudText>
                <HudText>{recipeCount}</HudText>
            </HudOuter>
            <HudOuter>
                <HudText>score</HudText>
                <HudText>{score}</HudText>
            </HudOuter>
        </HudWrapper>
    );
}

Hud.propTypes = {
    recipeCount: PropTypes.number,
    score: PropTypes.number,
    toggleAmbienceSound: PropTypes.func,
    playing: PropTypes.bool
}

export default Hud;