import './index.css';
import {createStore} from 'redux';

//default value of state
const reducer = (state = 17, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
        case 'RES':
            return action.value;
        case 'DLD':
            return;
        case 'UPL':
            return;
        default:
            return state;
    }
};

//action-creaters
const inc = () => ({type: 'INC'}),
    dec = () => ({type: 'DEC'}),
    res = (value) => ({type: 'RES', value}),
    dld = () => ({type: 'DLD'}),
    upl = () => ({type: 'UPL'});
    

const store = createStore(reducer);

const counterBlock = document.querySelector('.counter-block'),
    btnBlock = document.querySelector('.btn-block'),
    btnPlus = btnBlock.querySelectorAll('button')[0],
    btnMinus = btnBlock.querySelectorAll('button')[1],
    btnReset = btnBlock.querySelectorAll('button')[2],
    btnDownload = btnBlock.querySelectorAll('button')[3],
    btnUpload = btnBlock.querySelectorAll('button')[4];

let width = counterBlock.getBoundingClientRect().width,
    height = counterBlock.getBoundingClientRect().height;

//delegate-function
const delegate = (elem, event, func) => {
    for (let i = 0, items = elem.querySelectorAll('*'); i < items.length; i++) {
        if (items[i] === event.target || elem === event.target) {
            func();
            break;
        };
    }
}

//default value of state
const initialState = store.getState();

counterBlock.textContent = initialState;

btnBlock.addEventListener('click', event => {
    delegate(btnPlus, event, () => {
        store.dispatch(inc());
    });
    delegate(btnMinus, event, () => {
        store.dispatch(dec());
    });
    delegate(btnReset, event, () => {
        store.dispatch(res(initialState));
    });
})

const update = () => {
    counterBlock.textContent = store.getState();
    if ( store.getState() > (initialState - 17) && store.getState() < (initialState + 44) ) {
        counterBlock.style.width = `${width + (store.getState() - initialState) * 5}px`;
        counterBlock.style.height = `${height + (store.getState() - initialState) * 5}px`;
    }
}

store.subscribe(update);
