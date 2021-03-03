import { sound } from '../constants/index'

import { coffeeButtons } from '../constants/index'

export function clearArray(arr = [], index = 0) {
    while (arr[index].length > 0) {
        arr[index].pop();
    }
}

export function buttonIconSwitcher(iconName) {
    switch (iconName) {
        case 'enabled':
            return coffeeButtons.enabled;
        case 'disabled':
            return coffeeButtons.disabled
        case 'start':
            return coffeeButtons.start
        case 'sucess':
            return coffeeButtons.sucess
        case 'fail':
            return coffeeButtons.fail
        default:
            return coffeeButtons.fail
    }
}

export function getAllElementsWithAttribute(attribute) {
    var matchingElements = [];
    var allElements = document.getElementsByTagName('*');
    for (var i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
}

export function findActiveCup(cups) {
    const activedCup = []
    cups.forEach((cup) => { activedCup.push(cup.dataset.active); })
    const cupIdx = activedCup.indexOf('true');
    return cupIdx;
}

export function coffeeBrewAudio(audioIdx) {
    audioIdx = new Audio(sound.coffeeBrew);
    return audioIdx;
}

export function stopPlay(audio) {
    audio.pause();
    audio.currentTime = 0.0;
}

export function buttonStateSwitcher(dataset) {
    switch (dataset) {
        case 'ready':
        case 'done':
            return 'sucess';
        case 'fail':
            return 'fail'
        case 'start':
            return 'disabled'
        case 'active':
            return 'start'
        default:
            return console.log('buttonStateSwitcher fnc error!');
    }
}

export function removeReciept(recipts, doneRecipt) {
    const updatedReciepts = [];

    recipts.forEach((el) => {
        const recipeEl = el['id'].join(',');
        const doneRecipeEl = doneRecipt.join(',');

        if (recipeEl !== doneRecipeEl) {
            updatedReciepts.push({ id: recipeEl.split(',') })
        }
        return;
    });
    return updatedReciepts;
}

export function shuffle(arr) {
    return arr.sort( () => Math.random() - 0.5);
}

export function storeAudio(state) {
    localStorage.setItem('audio', (state) ? 'off' : 'on');
}