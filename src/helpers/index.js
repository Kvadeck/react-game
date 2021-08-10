import { soundAssets } from '../constants/index'
import { fill } from 'lodash'

import { coffeeButtons } from '../constants/index'

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
    let matchingElements = [];
    let allElements = document.getElementsByTagName('*');
    for (let i = 0, n = allElements.length; i < n; i++) {
        if (allElements[i].getAttribute(attribute) !== null) {
            matchingElements.push(allElements[i]);
        }
    }
    return matchingElements;
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

export function shuffle(arr) {
    return arr.sort( () => Math.random() - 0.5);
}

export function newCupSelect(index, arr, flag = true) {
    const pureCups = fill(arr, false)
    pureCups[index] = flag
    return pureCups
}