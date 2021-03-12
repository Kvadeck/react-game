import PropTypes from 'prop-types'
import styled from 'styled-components';
import JarEmpty from '../../assets/ingredients/JarEmpty.png';
import { IngredientCustoms } from '../../constants/index'
import Footer from '../footer';

const IngredientsWrapper = styled.div`
    display: flex;
    justify-content: space-between;
    position: relative;
    width: 100%;
    flex-direction: column;
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
const EmptyJar = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 91px;
    height: 105px;
    background-image: url(${JarEmpty});
`;
const IngredientImage = styled.img`
    width: ${({ iconWidth }) => iconWidth || "50px"};
    top: ${({ iconTop }) => iconTop || "45px"};
    height: ${({ iconHeight }) => iconHeight || "41px"};
    position: absolute;
    cursor: pointer;
`;

function Ingredients({ addIngredient }) {

    const IngredientList = IngredientCustoms.map((el, i) =>
    (
        <EmptyJar key={i.toString()}>
            <IngredientImage
                id={el.id}
                src={el.src}
                key={i.toString()}
                onClick={addIngredient()}
                iconWidth={el.width}
                iconTop={el.top}
                iconHeight={el.height}
            />
        </EmptyJar>
    ))

    return (
        <IngredientsWrapper>
            <JarWrapper>
                {IngredientList}
            </JarWrapper>
            <Footer/>
        </IngredientsWrapper>
    );
}

Ingredients.propTypes = {
    getIngredientName: PropTypes.func,
}

export default Ingredients;