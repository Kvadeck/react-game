/* eslint-disable react-hooks/exhaustive-deps */
import PropTypes from 'prop-types'
import styled from 'styled-components';
import BarEnd from '../../assets/recipe/barEnds.png';
import RecipeBack from '../../assets/recipe/orderReceipt.png'
import { recipeImg } from '../../constants/index'
import React from 'react';
import { removeReciept, shuffle } from '../../helpers/index'

const RecipeWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    position: relative;
    width: 100%;
    align-items: flex-start;
    min-height: 250px;
    padding: 0 15px;
    border-top: var(--border-top-recipe-color) 1rem solid;
    flex-direction: column;

    &:before {
        content: '';
        width: 19px;
        height: 40px;
        background-image: url(${BarEnd});
        position: absolute;
        display: block;
        top: -10px;
        left: 0;
        z-index: 10;
    }
    &:after {
        content: '';
        width: 19px;
        height: 40px;
        background-image: url(${BarEnd});
        position: absolute;
        display: block;
        top: -10px;
        right: 0;
        transform: scaleX(-1);
        z-index: 10;
    }
`;

const Curtain = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    width: 100%;
    align-items: flex-start;
    height: 30px;
    background: white;
    opacity: .3;
    z-index: 2;
`;

const RecipeCardWrapper = styled.div`
    display: flex;
    justify-content: flex-start;
    position: relative;
    align-items: center;
    width: 100%;
    padding: 0 15px;
`;

const RecipeCard = styled.div`
    display: flex;
    justify-content: center;
    position: relative;
    align-items: center;
    width: 105px;
    height: 111px;
    margin: 0 5px;
    margin-top: -30px;
    background-image: url(${RecipeBack});
`;

const OrderImage = styled.img`
    cursor: pointer;
`;

function Recipe({ recipe }) {

    // TODO: Прибавлять очки только если рецепт выполнился

    const [recepts, setRecepts] = React.useState(shuffle([
            { id: ['chocolate', 'chocolate'] },
            { id: ['cinnamon'] },
            { id: ['cream', 'chocolate'] },
            { id: ['sugar', 'cream'] },
        ])
    );

    React.useEffect(() => {
        if (recipe.length) {
            setRecepts([].concat(removeReciept(recepts, recipe)))
        }
    }, [recipe])

    const RecipeList = recepts && recepts.map((el, i) =>
    (
        <RecipeCard key={i.toString()}>
            {(el['id'] || []).map((val, j) => {
                return (
                    <OrderImage
                        key={j.toString()}
                        src={recipeImg[val.toString()]}
                    />
                );
            })}
        </RecipeCard>
    ));

    return (
        <RecipeWrapper>
            <Curtain />
            <RecipeCardWrapper>
                {RecipeList}
            </RecipeCardWrapper>
        </RecipeWrapper>
    );
}

Recipe.propTypes = {
    recipe: PropTypes.array,
}

export default Recipe;