import styled from 'styled-components';
import React from 'react';
import gitHubImg from '../../assets/footer/github.svg'
import rsSchoolImg from '../../assets/footer/rs_school_js.svg'

const FooterWrapper = styled.footer`
    padding: 10px 0;
    background-color: #7f3630;
    color: black;
    z-index: 6;
    opacity: .9;
    width: 100%;
`;
const FooterContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 0 auto;
    width: 100%;
    min-height: 100%;
`;
const FooterLinksWrapper = styled.div`
    display: flex;
    align-items: center;
`;
const FooterTeamList = styled.ul`
     display: flex;
`;
const FooterTeamItem = styled.li`
`;
const FooterLink = styled.a`
    display: flex;
    align-items: center;
    transition: .3s;
    text-decoration: none;
    color: black;
`;
const FooterTeamAuthor = styled.span`
    margin-right: 10px;
    font-size: 1.4rem;
    font-weight: bold;
`;
const FooterYear = styled.span`
     margin-right: 10px;
     font-size: 1.4rem;
     font-weight: bold;
`;
const FooterTeamGithubImg = styled.img`
    width: 16px;
    height: 16px;
    margin-right: 10px;
`;
const FooterCourseWrapper = styled.div`
    padding: 4px 6px;
    border-radius: 4px;
`;
const FooterRsSchoolImg = styled.img`
    width: 74px;
`;



function Footer() {

    return (

        <FooterWrapper>
            <FooterContainer>
                <FooterLinksWrapper>
                    <FooterYear>2021</FooterYear>
                    <FooterTeamList>
                        <FooterTeamItem>
                            <FooterLink href="https://github.com/Kvadeck" target="_blank">
                                <FooterTeamGithubImg alt="github" src={gitHubImg} />
                                <FooterTeamAuthor>kvadeck</FooterTeamAuthor>
                            </FooterLink>
                        </FooterTeamItem>
                    </FooterTeamList>
                </FooterLinksWrapper>

                <FooterCourseWrapper>
                    <FooterLink href="https://rs.school/js/" target="_blank">
                        <FooterRsSchoolImg alt="rs_school" src={rsSchoolImg}/>   
                    </FooterLink>
                </FooterCourseWrapper>



            </FooterContainer>
        </FooterWrapper>
    );
}

export default Footer;