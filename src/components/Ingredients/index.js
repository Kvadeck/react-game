import PropTypes from 'prop-types'
import styled from 'styled-components';
import JarEmpty from '../../assets/ingredients/JarEmpty.png';
import { IngredientList } from '../../constants/index'

// !TODO: Сделать клик по банке вместо самого ингредиента
// !TODO: Добавить какой нибудь ховер эффект(при наведение на банку ингредиент передвигается вверх и вниз)

const IngredientsWrapper = styled.div`
    display: flex;
    position: relative;
    width: 100%;
    align-items: flex-start;
    height: 250px;
    background-color: var(--background-ingredients-color);
    border-top: 15px solid var(--border-ingredients-color);
    padding: 0 15px;
`;
const JarWrapper = styled.div`
    display: flex;
    padding: 5px;
    justify-content: center;
    position: relative;
    width: 100%;
    align-items: center;
    background-color: var(--background-jar-color);
`;
const EmptyJar = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 91px;
    height: 105px;
    background-image: url(${JarEmpty});
    cursor: pointer;
    &:hover {
        img {
            animation-play-state: running;    
        }
    }
    `;
const IngredientImage = styled.img`
    position: absolute;
    cursor: pointer;
    top: ${({ top }) => top};
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    animation: upDown .8s infinite;
    animation-play-state: paused;
    user-select: none;
`;

function Ingredients({ addIngredient }) {

    const JarList = IngredientList.map((el) =>
    (
        <EmptyJar onClick={addIngredient()} id={el.id} key={el.id}>
            <IngredientImage
                src={el.src}
                top={el.top}
                width={el.width}
                height={el.height}
            />
        </EmptyJar>
    ))

    return (
        <IngredientsWrapper>
            <JarWrapper>
                {JarList}
            </JarWrapper>
        </IngredientsWrapper>
    );
}

Ingredients.propTypes = {
    addIngredient: PropTypes.func,
}

export default Ingredients;