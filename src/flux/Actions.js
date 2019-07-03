import * as ActionsType from './ActionsType'
import Dispacher from './Dispatcher'

export const increment = (count) => {
    Dispacher.dispatch({
        type: ActionsType.Increment,
        value: count
    })
}


export const decrement = (count) => {
    Dispacher.dispatch({
        type: ActionsType.Decrement,
        value: count
    })
}