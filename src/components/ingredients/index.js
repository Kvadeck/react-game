import PropTypes from 'prop-types'
import styled from 'styled-components';
import JarImg from '../../assets/ingredients/JarEmpty.png';
import {ingredients} from '../../constants/index'

const IngredientsWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    align-items: flex-start;
    min-height: 250px;
    background-color: var(--background-ingredients-color);
    border-top: 15px solid var(--border-ingredients-color);
    padding: 0 15px;
`;
const JarWrapper = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    align-items: center;
    min-height: 100px;
    background-color: var(--background-jar-color);
`;
const Jar = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    align-items: center;
    cursor: pointer;
    &:before {
        content:'';
        background-image: url(${({ ingredientIcon }) => ingredientIcon || "none"});
        width: ${({ iconWidth }) => iconWidth || "50px"};
        top: ${({ iconTop }) => iconTop || "45px"};
        height: ${({ iconHeight }) => iconHeight || "41px"};
        position: absolute;
    }
`;

const JarImage = styled.img`
    width: auto;
`;

function Ingredients() {
    return (

        <IngredientsWrapper>
            <JarWrapper>
                <Jar ingredientIcon={ingredients['cinnamon']} iconWidth={'45px'} iconTop={'35px'} iconHeight={'54px'}>
                    <JarImage src={JarImg} />
                </Jar>
                <Jar ingredientIcon={ingredients['milk']} iconWidth={'50px'} iconTop={'27px'} iconHeight={'61px'}>
                    <JarImage src={JarImg} />
                </Jar>
                <Jar ingredientIcon={ingredients['chocolate']} iconWidth={'50px'} iconTop={'45px'} iconHeight={'41px'}>
                    <JarImage src={JarImg} />
                </Jar>
                <Jar ingredientIcon={ingredients['sugar']} iconWidth={'50px'} iconTop={'34px'} iconHeight={'53px'}>
                    <JarImage src={JarImg} />
                </Jar>
                <Jar ingredientIcon={ingredients['coffee']} iconWidth={'50px'} iconTop={'41px'} iconHeight={'39px'}>
                    <JarImage src={JarImg} />
                </Jar>
            </JarWrapper>
        </IngredientsWrapper>

    );
}

// Inner.propTypes = {
//     justifyContent: PropTypes.string,
//     maxWidth: PropTypes.string
// }

export default Ingredients;