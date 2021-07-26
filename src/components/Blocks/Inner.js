import styled from 'styled-components';
import PropTypes from 'prop-types'

const Inner = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: ${({justifyContent}) => justifyContent || "initial" };
    position: relative;
    top: 0;
    left: 0;
    max-width: ${({maxWidth}) => maxWidth || "100%" };
    width: 100%;
`;

Inner.propTypes = {
    justifyContent: PropTypes.string,
    maxWidth: PropTypes.string
}

export default Inner