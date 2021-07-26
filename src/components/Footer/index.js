import styled from 'styled-components';
import React from 'react';

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

function Footer() {

    return (

        <FooterWrapper>
            <FooterContainer>
            </FooterContainer>
        </FooterWrapper>
    );
}

export default Footer;