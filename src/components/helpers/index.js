import { coffeeButtons } from '../../constants/index'

export function rmFrmIngCupCollection(arr = [], index = 0) {
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
