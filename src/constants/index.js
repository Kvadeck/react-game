import Chocolate from '../assets/ingredients/jarIngredients/ChocolateIcon.png';
import Cinnamon from '../assets/ingredients/jarIngredients/CinnamonIcon.png';
import Coffee from '../assets/ingredients/jarIngredients/Coffee.png';
import Cream from '../assets/ingredients/jarIngredients/CreamIcon.png';
import Sugar from '../assets/ingredients/jarIngredients/Sugar.png';


import chocolateOrder from '../assets/recipe/orderIngredients/chocolateOrder.png'
import cinnamonOrder from '../assets/recipe/orderIngredients/cinnamonOrder.png'
import creamerOrder from '../assets/recipe/orderIngredients/creamerOrder.png'
import milkOrder from '../assets/recipe/orderIngredients/milkOrder.png'
import sugarOrder from '../assets/recipe/orderIngredients/sugarOrder.png'

import Cup from '../assets/expresso/cup/Cup.png';
import CupSelected from '../assets/expresso/cup/CupSelected.png';

import chocolateIngredient from '../assets/cupIngredients/chocolateCupIngredient.png'
import cinnamonIngredient from '../assets/cupIngredients/cinnamonCupIngredient.png'
import coffeeIngredient from '../assets/cupIngredients/coffeeCupIngredient.png'
import creamIngredient from '../assets/cupIngredients/creamCupIngredient.png'
import sugarIngredient from '../assets/cupIngredients/sugarCupIngredient.png'

import ServeEnabledBtn from '../assets/expresso/buttons/serveEnabled.png';
import ServeDisabledBtn from '../assets/expresso/buttons/serveDisabled.png';
import StartServeBtn from '../assets/expresso/buttons/startServe.png';
import SucessBtn from '../assets/expresso/buttons/serveSuccess.png';
import FailBtn from '../assets/expresso/buttons/orderFail.png';

// TIMER
// SCORE

export const failTime = 2000;

export const recipe = {
    'chocolate' : chocolateOrder,
    'cinnamon' : cinnamonOrder,
    'creamer' : creamerOrder,
    'milk' : milkOrder,
    'sugar' : sugarOrder,
}

export const ingredients = {
    'chocolate' : Chocolate,
    'cinnamon' : Cinnamon,
    'coffee' : Coffee,
    'milk' : Cream,
    'sugar' : Sugar,
}

export const cups = {
    'selected' : CupSelected,
    'normal' : Cup,
}

export const cupIngredients = {
    'chocolate' : chocolateIngredient,
    'cinnamon' : cinnamonIngredient,
    'coffee' : coffeeIngredient,
    'cream' : creamIngredient,
    'sugar' : sugarIngredient,
}

export const IngredientCustoms = [
    {id:'cinnamon', src: ingredients['cinnamon'], width:'45px', top:'35px', height:'54px'},
    {id:'cream', src: ingredients['milk'], width:'45px', top:'27px', height:'61px'},
    {id:'chocolate', src: ingredients['chocolate'], width:'50px', top:'45px', height:'41px'},
    {id:'sugar', src: ingredients['sugar'], width:'50px', top:'34px', height:'53px'},
    {id:'coffee', src: ingredients['coffee'], width:'50px', top:'41px', height:'39px'},
]

export const sound = {
    selectcup: '/sound/cupMove.mp3',
    ingredientClick: '/sound/ingredientClick.mp3',
    coffeeStop: '/sound/coffeeStop.mp3',
    coffeeStart: '/sound/coffeeStart.mp3',
    answerCorrect: '/sound/answerCorrect.mp3',
    coffeeBrew: '/sound/coffeeBrew.mp3'
}


export const coffeeButtons = {
    'enabled' : ServeEnabledBtn,
    'disabled' : ServeDisabledBtn,
    'start' : StartServeBtn,
    'sucess' : SucessBtn,
    'fail' : FailBtn,
}