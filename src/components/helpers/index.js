import { sound } from '../../constants/index'

import { coffeeButtons } from '../../constants/index'

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

export function getAllElementsWithAttribute(attribute)
{
  var matchingElements = [];
  var allElements = document.getElementsByTagName('*');
  for (var i = 0, n = allElements.length; i < n; i++)
  {
    if (allElements[i].getAttribute(attribute) !== null)
    {
      matchingElements.push(allElements[i]);
    }
  }
  return matchingElements;
}

export function findActiveCup(cups) {
    const activedCup = []
    cups.forEach((cup)=> { activedCup.push(cup.dataset.active);})
    const cupIdx = activedCup.indexOf('true');
    return cupIdx;
}

export function findActiveCooking(cups, stage) {
    const activedCooking = []
    cups.forEach((cup)=> { activedCooking.push(cup.dataset.cooking);})
    const cookingIdx = activedCooking.lastIndexOf(stage);
    if(cookingIdx !== -1) {
        return cookingIdx;
    } else {
        console.log('data-cooking not found');
    }
    
}

export function coffeeBrew(audioIdx) {
    audioIdx = new Audio(sound.coffeeBrew);
    return audioIdx;
}