import { EventEmitter } from "events";
import * as ActionsType from './ActionsType'
import Dispatcher from './Dispatcher'


const ChangeValue = "ChangeValue";
const Summary = "Summary";

const countValue = {
    count: 0,
}

const CounterStore = Object.assign({}, EventEmitter.prototype, {
    getCount: function () {
        return countValue.count;
    },
    emitChange: function () {
        this.emit(ChangeValue);
    },
    addChangeListener: function (callback) {
        this.on(ChangeValue, callback)
    },
    removeChangeListener: function (callback) {
        this.removeChangeListener(ChangeValue, callback)
    }
})
CounterStore.dispatchToken = Dispatcher.register((action) => {
    if (action.type === ActionsType.Increment) {
        countValue.count += action.value;
        CounterStore.emitChange();
    } else {
        countValue.count -= action.value;
        CounterStore.emitChange();
    }
})



const SummaryStore = Object.assign({}, EventEmitter.prototype, {
    getSymmary() {
        return CounterStore.getCount() + 8
    },
    emitChange: function () {
        this.emit(Summary);
    },
    addChangeListener: function (callback) {
        this.on(Summary, callback)
    },
    removeChangeListener: function (callback) {
        this.removeChangeListener(Summary, callback)
    }
})

SummaryStore.dispatchToken = Dispatcher.register((action) => {
    Dispatcher.waitFor([CounterStore.dispatchToken])
    SummaryStore.emitChange()
})

export {
    CounterStore,
    SummaryStore
};
