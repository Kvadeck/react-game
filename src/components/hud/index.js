import PropTypes from 'prop-types'
import styled from 'styled-components';
import React from 'react';

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

function Hud() {
    const [sound, setSound] = React.useState([false]);

    function soundSwitchHandle() {
        // TODO: Функция выключения звука
        setSound(!sound);
    }

    React.useEffect(() => {

    }, [])

    return (
        <HudWrapper>
            <HudOuter cursor={'pointer'} onClick={() => soundSwitchHandle()}>
                <HudText>sound</HudText>
                <HudText>{sound ? 'off': 'on'}</HudText>
            </HudOuter>
            <HudOuter width={'120px'}>
                <HudText>orders</HudText>
                <HudText>{}</HudText>
            </HudOuter>
            <HudOuter>
                <HudText>score</HudText>
                <HudText>0</HudText>
            </HudOuter>
        </HudWrapper>
    );
}

Hud.propTypes = {
    show: PropTypes.string,
    score: PropTypes.func,
}

export default Hud;