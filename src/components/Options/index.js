/* eslint-disable no-restricted-globals */
import React from 'react';
import PropTypes from 'prop-types'
import styled from 'styled-components';
import { CSSTransition, SwitchTransition } from "react-transition-group"
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
    display: flex;
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
    display: flex;
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

const ConfirmYes = styled(ConfirmText)`
    color: green;
`;
const ConfirmNo = styled(ConfirmText)`
    color: red;
`;

const FullscreenItem = styled(Item)`
    top: 100px;
`;
const FullscreenText = styled.span`
    display: flex;
`;
const FullscreenToogleText = styled.span`
    width: 30px;
    color: #673ab7;
    margin-left: 5px;
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

const HelpItem = styled(Item)`
    top: 180px;
`;

const LanguageSelectWrap = styled(WrapItem)`
    display: flex;
`;
const EnglishItem = styled(Item)`
    top: 80px;
`;
const RussianItem = styled(Item)`
    top: 100px;
`;

const HelpText = styled.div`
    display: flex;
    position: absolute;
    top: 85px;
    padding: 0 35px;
    font-size: 1.5rem;
    font-family: 'Rotonda Regular', sans-serif;
    line-height: 1.3;
`;


// !TODO: Отказаться от библиотек с выпадающим списком и модальным окном
// !TODO: Поменять дизайн. Сгрупировать все опции в отдельное открывающиеся окно
// !TODO: Доделать анимацию для пункта help
// !TODO: Сделать окно с помощью. Разместить там текст и сделать переход

// TODO: Сделать переключение нескольких языков
// TODO: Выделять актуальный язык на данный момент

function Options({ toogleOptions }) {

    const [modalFlag, setModalFlag] = React.useState(false)
    const [sound, setSound] = React.useState((audioLocalState === 'off') ? true : false)
    const [music, setMusic] = React.useState(true)
    const [fullscreen, setFullscreen] = React.useState(false)
    const [newGame, setNewGame] = React.useState(false)
    const [language, setLanguage] = React.useState(false)
    const [help, setHelp] = React.useState(false)

    const nodeRef = React.useRef(null)
    const newGameRef = React.useRef(null)
    const fullscreenRef = React.useRef(null)

    React.useEffect(() => {
        if (toogleOptions) {
            setModalFlag(toogleOptions)
            setNewGame(false)
            setLanguage(false)
            setHelp(false)
        }
    }, [toogleOptions])

    const confirmHandle = () => setNewGame(!newGame)
    const newGameHandle = () => location.reload()

    function soundHandle() {
        localStorage.setItem('audio', (!sound) ? 'off' : 'on')
        return setSound(!sound)
    }
    function backHandle() {
        setLanguage(false)
        setHelp(false)
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
                <BackWrap flag={language || help} onClick={() => backHandle()}>
                    <Back />
                </BackWrap>
                
                <Title>Options</Title>

                <SwitchTransition mode="out-in">
                    <CSSTransition
                        classNames="fade"
                        timeout={300}
                        key={language || help}
                        nodeRef={nodeRef}
                    >
                        <>
                            {(!language && !help) &&
                                <WrapItem ref={nodeRef}>
                                    <NewGameItem>
                                        <SwitchTransition mode="out-in">
                                            <CSSTransition
                                                classNames="fade"
                                                timeout={200}
                                                nodeRef={newGameRef}
                                                key={newGame}
                                            >
                                                {!newGame
                                                    ? <NewGameText ref={newGameRef} onClick={() => confirmHandle()}>New Game</NewGameText>
                                                    : <ConfirmNewGameWrap ref={newGameRef}>
                                                        <ConfirmYes onClick={() => newGameHandle()}>
                                                            Yes
                                                        </ConfirmYes>
                                                        <ConfirmNo onClick={() => confirmHandle()}>
                                                            No
                                                        </ConfirmNo>
                                                    </ConfirmNewGameWrap>}
                                            </CSSTransition>
                                        </SwitchTransition>
                                    </NewGameItem>

                                    <FullscreenItem onClick={() => fullScreenHandle()}>
                                        <FullscreenText>Fullscreen</FullscreenText>
                                        <SwitchTransition mode="out-in">
                                            <CSSTransition
                                                classNames="fade"
                                                nodeRef={fullscreenRef}
                                                timeout={200}
                                                key={fullscreen}
                                            >
                                                <FullscreenToogleText ref={fullscreenRef}>
                                                    {fullscreen ? "Off" : "On"}
                                                </FullscreenToogleText>
                                            </CSSTransition>
                                        </SwitchTransition>
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

                                    <HelpItem onClick={() => setHelp(!help)}>
                                        Help
                                    </HelpItem>
                                </WrapItem>}

                            {language && <LanguageSelectWrap ref={nodeRef}>
                                    <EnglishItem>English</EnglishItem>
                                    <RussianItem>Русский</RussianItem>
                            </LanguageSelectWrap>}

                            {help && <HelpText ref={nodeRef}>
                                {helpText}
                            </HelpText>}

                        </>
                    </CSSTransition>
                </SwitchTransition>
            </Modal>
        </Wrapper >
    );
}

Options.propTypes = {
    toogleOptions: PropTypes.any
}

export default Options;