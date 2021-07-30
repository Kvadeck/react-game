/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { soundAssets, recipeEndConfirm, helpText, audioLocalState, modalImg } from '../../constants/index'
import bgImage from '../../assets/optionsBg.png'
import CrossImg from '../../assets/cross.png'
import BackImg from '../../assets/back.png'
import Sound from 'react-sound'

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
    width: 390px;
    height: 380px;
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

const CloseWrap = styled.div`  
    position: absolute;
    top: 8px;
    right: 7px;
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

const BackWrap = styled(CloseWrap)`  
    left: 7px;
    display: ${props => props.flag ? 'flex' : 'none'};
    &:hover {
        span {
            transform: rotate(360deg);
        }
    }
`;

const Back = styled(Cross)`  
    background-image:url(${BackImg});
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

const WrapItem = styled.div`
    position: relative;
    width: 100%;
    top: 6px;
    flex-direction: column;
    align-items: center;
    display: ${props => props.flag ? 'none' : 'flex'};
`;

const Item = styled.div`
    position: relative;
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    width: fit-content;
    top: 80px;
    font-size: 2rem;
    color: #795548;
    user-select: none;
    cursor: pointer;
    transition: color .2s linear;
    &:hover {
        color: #673ab7;
    }
    &::before {
        content: '';
        position: absolute;
        display: flex;
        width: 75px;
        height: 3px;
        top: 9px;
        border-radius: 2px;
        background-color: #673ab7;
        transition: visibility .1s linear;
        visibility: hidden;
    }
`;

const NewGameItem = styled(Item)`
    top: 80px;
`;

const NewGameText = styled.span`
    position: relative;
    display: ${props => props.flag ? 'none' : 'initial'};
`;

const ConfirmNewGameWrap = styled.div`
    position: relative;
    display: ${props => props.flag ? 'flex' : 'none'};
`;

const ConfirmText = styled.p`
    position: relative;
    display: flex;
    margin: 0 5px;
    transition: transform .2s linear;
    &:hover {
        transform: scale(1.1);
    }
`;

const ConfirmTextYes = styled(ConfirmText)`
    color: green;
`;
const ConfirmTextNo = styled(ConfirmText)`
    color: red;
`;

const FullscreenItem = styled(Item)`
    top: 100px;
`;

const FullscreenToogleText = styled.span`
    color: #673ab7;
    margin-left: 5px;
    // Не правильный порядок. Анимация работает не зависимо от изменения в DOM.
    animation-fill-mode: forwards;
    animation-duration: ${props => props.flag ? '.6s' : '.5s'};
    animation-timing-function: ${props => props.flag ? 'cubic-bezier(0.55, 0.085, 0.68, 0.53)' : 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'};
    animation-name: ${props => props.flag ? 'toogleTextIn' : 'toogleTextOut'};
`;

const LanguageItem = styled(Item)`
    top: 120px;
`;

const MusicItem = styled(Item)`
    top: 140px;
    color: ${props => props.flag && "#673ab7"};
    &::before {
        visibility: ${props => props.flag && "visible"};
    }
`;

const SoundItem = styled(Item)`
    top: 160px;
    color: ${props => props.flag && "#673ab7"};
    &::before {
        visibility: ${props => props.flag && "visible"};
    }
`;

const AboutItem = styled(Item)`
    top: 180px;
`;

const LanguageSelectWrap = styled(WrapItem)`
    display: ${props => props.flag ? 'flex' : 'none'};
`;
const EnglishItem = styled(Item)`
    top: 80px;
`;
const RussianItem = styled(Item)`
    top: 100px;
`;

// !TODO: Отказаться от библиотек с выпадающим списком и модальным окном
// !TODO: Поменять дизайн. Сгрупировать все опции в отдельное открывающиеся окно

// TODO: Сделать окно с помощью. Разместить там текст и сделать переход
// TODO: Сделать переключение нескольких языков

function Options({ toogleOptions }) {

    const [modalFlag, setModalFlag] = React.useState(false)
    const [sound, setSound] = React.useState((audioLocalState === 'off') ? true : false)
    const [music, setMusic] = React.useState(true)
    const [fullscreen, setFullscreen] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [language, setLanguage] = React.useState(false)

    React.useEffect(() => {
        if (toogleOptions) {
            setModalFlag(toogleOptions)
            setNewGame(false)
            setLanguage(false)
        }
    }, [toogleOptions])

    function confirmHandle() {
        return setNewGame(!newGame)
    }

    function newGameHandle() {
        return location.reload()
    }

    function soundHandle() {
        localStorage.setItem('audio', (!sound) ? 'off' : 'on')
        return setSound(!sound)
    }

    function fullScreenHandle() {
        if (fullscreen) {
            document.exitFullscreen()
                .catch((err) => console.error(err))
        } else {
            document.documentElement.requestFullscreen();
        }
        return setFullscreen(!fullscreen)
    }

    return (
        <Wrapper>
            <Sound
                url={soundAssets.guitarRadioAmbienceLoop}
                playStatus={(!music) ? Sound.status.PLAYING : Sound.status.STOPPED}
                loop={true}
            />
            <Overlay flag={modalFlag} />

            <Modal flag={modalFlag}>
                <CloseWrap onClick={() => setModalFlag(!modalFlag)}>
                    <Cross />
                </CloseWrap>
                <BackWrap flag={language} onClick={() => setLanguage(!language)}>
                    <Back />
                </BackWrap>
                <Title>Options</Title>
                <WrapItem flag={language}>

                    <NewGameItem>
                        <NewGameText flag={newGame} onClick={() => confirmHandle()}>New Game</NewGameText>
                        <ConfirmNewGameWrap flag={newGame}>
                            <ConfirmTextYes onClick={() => newGameHandle()}>
                                Yes
                            </ConfirmTextYes>
                            <ConfirmTextNo onClick={() => confirmHandle()}>
                                No
                            </ConfirmTextNo>
                        </ConfirmNewGameWrap>
                    </NewGameItem>

                    <FullscreenItem onClick={() => fullScreenHandle()}>
                        Fullscreen <FullscreenToogleText flag={fullscreen}>{(fullscreen) ? 'off' : 'on'}</FullscreenToogleText>
                    </FullscreenItem>

                    <LanguageItem onClick={() => setLanguage(!language)}>
                        Language
                    </LanguageItem>

                    <MusicItem flag={music} onClick={() => setMusic(!music)}>
                        Music
                    </MusicItem>

                    <SoundItem flag={sound} onClick={() => soundHandle(!sound)}>
                        Sound
                    </SoundItem>

                    <AboutItem>
                        Help
                    </AboutItem>
                </WrapItem>
                <LanguageSelectWrap flag={language}>

                    <EnglishItem>
                        English
                    </EnglishItem>

                    <RussianItem flag={music} onClick={() => setMusic(!music)}>
                        Russian
                    </RussianItem>

                </LanguageSelectWrap>
            </Modal>

        </Wrapper>
    );
}

Options.propTypes = {
    toogleOptions: PropTypes.bool
}

export default Options;