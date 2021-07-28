import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { recipeEndConfirm } from '../../constants/index'
import Bean from '../../assets/bean.png'

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
`;
const HudMenuInner = styled(HudInner)`
  cursor: pointer;
  &:hover {
      span {
          opacity:1;
      }
  }
`;

const HudText = styled.span`
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.4rem;
  cursor: default;
`;

const HudMenuText = styled(HudText)`
  cursor: pointer;
  &:hover {
      span {
          opacity:1;
      }
  }
`;

const HudBean = styled.span`
    cursor: default;
    background-image:url(${Bean});
    width: 16px;
    height: 16px;
    position: absolute;
    top: -1px;
    left: 60px;
    opacity: 0;
    transition: opacity .2s ease-in;
    cursor: pointer;
`;

// !TODO: Добавить ховер эффект у элемента меню в HUD
// TODO: Стилизовать модальное окно для подтверждения

function HUD({ recipeCount, score, setToogleModal }) {

    React.useEffect(() => {
        if (!recipeCount) {
            // confirm(recipeEndConfirm);
            // document.location.reload();
        }
    }, [recipeCount])

    return (
        <HudWrapper>
            <HudMenuInner onClick={setToogleModal(true)}>
                <HudMenuText>
                    Menu
                    <HudBean></HudBean>
                </HudMenuText>
            </HudMenuInner>
            <HudOuter>
                <HudInner>
                    <HudText>Orders</HudText>
                    <HudText>{recipeCount}</HudText>
                </HudInner>

                <HudInner>
                    <HudText>Score</HudText>
                    <HudText>{score}</HudText>
                </HudInner>
            </HudOuter>
        </HudWrapper>
    );
}

HUD.propTypes = {
    recipeCount: PropTypes.number.isRequired,
    score: PropTypes.number.isRequired,
    setToogleModal: PropTypes.func.isRequired
}

export default HUD;