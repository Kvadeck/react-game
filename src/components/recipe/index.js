import PropTypes from 'prop-types'
import styled from 'styled-components';
import BarEnd from '../../assets/recipe/barEnds.png';
import RecipeBack from '../../assets/recipe/orderReceipt.png'
import {recipe} from '../../constants/index'

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
    justify-content: space-between;
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
    margin-top: -30px;
    background-image: url(${RecipeBack});
`;

const OrderImage = styled.img`
    cursor: pointer;
`;


function Recipe() {
    return (

        <RecipeWrapper>
            <Curtain />

            <RecipeCardWrapper>
                <RecipeCard>
                    <OrderImage src={recipe['chocolate']}/>
                    <OrderImage src={recipe['chocolate']}/>
                </RecipeCard>
                <RecipeCard>
                    <OrderImage src={recipe['cinnamon']}/>
                </RecipeCard>
                <RecipeCard> 
                    <OrderImage src={recipe['creamer']}/>
                    <OrderImage src={recipe['creamer']}/>
                </RecipeCard>
                <RecipeCard>
                    <OrderImage src={recipe['sugar']}/>
                </RecipeCard>
            </RecipeCardWrapper>

        </RecipeWrapper>

    );
}


export default Recipe;