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

export const failTime = 1500;
export const scorePlus = 120;


export const recipeEndConfirm = 'К сожалению на сегодня рецептов больше нет. (демо)';

export const helpText = 'Это будет краткая инструкция к работе кофеварки. Можно добавлять один из пяти ингредиентов. Такие, как сливки, корица, шоколад, сахар, кофейные зерна. Каждый клиент выбирает по вкусу. Поэтому тебе нужно приготовить кофе по рецепту. За каждый выполненный рецепт ты получишь очки. Чем больше рецептов ты выполнишь, тем больше очков ты получишь. На сегодня у тебя всего четыре рецепта. Но подожди и со временем будет больше. Будь внимателен когда будешь готовить кофе. Так как если передержать кофе, то оно будет считаться испорченным.';


export const recipeImg = {
    'chocolate': chocolateOrder,
    'cinnamon': cinnamonOrder,
    'cream': creamerOrder,
    'milk': milkOrder,
    'sugar': sugarOrder,
}

export const ingredients = {
    'chocolate': Chocolate,
    'cinnamon': Cinnamon,
    'coffee': Coffee,
    'milk': Cream,
    'sugar': Sugar,
}

export const cups = {
    'selected': CupSelected,
    'normal': Cup,
}

export const cupIngredients = {
    'chocolate': chocolateIngredient,
    'cinnamon': cinnamonIngredient,
    'coffee': coffeeIngredient,
    'cream': creamIngredient,
    'sugar': sugarIngredient,
}

export const IngredientCustoms = [
    { id: 'cinnamon', src: ingredients['cinnamon'], width: '45px', top: '35px', height: '54px' },
    { id: 'cream', src: ingredients['milk'], width: '45px', top: '27px', height: '61px' },
    { id: 'chocolate', src: ingredients['chocolate'], width: '50px', top: '45px', height: '41px' },
    { id: 'sugar', src: ingredients['sugar'], width: '50px', top: '34px', height: '53px' },
    { id: 'coffee', src: ingredients['coffee'], width: '50px', top: '41px', height: '39px' },
]

export const sound = {
    selectcup: '/sound/cupMove.mp3',
    ingredientClick: '/sound/ingredientClick.mp3',
    coffeeStop: '/sound/coffeeStop.mp3',
    coffeeStart: '/sound/coffeeStart.mp3',
    answerCorrect: '/sound/answerCorrect.mp3',
    coffeeBrew: '/sound/coffeeBrew.mp3',
    guitarRadioAmbienceLoop: '/sound/guitarRadioAmbienceLoop.mp3'
}


export const coffeeButtons = {
    'enabled': ServeEnabledBtn,
    'disabled': ServeDisabledBtn,
    'start': StartServeBtn,
    'sucess': SucessBtn,
    'fail': FailBtn,
}
