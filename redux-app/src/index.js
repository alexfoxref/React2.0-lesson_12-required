import './index.css';
import {createStore} from 'redux';

//service
const _apiBase = 'http://localhost:3000';

const getResource = async (url) => {
    const res = await fetch(`${_apiBase}${url}`);

    if (!res.ok) {
        throw new Error(res.status)
    }
    return await res.json();
}

const postResource = async (url, data) => {
    await fetch(`${_apiBase}${url}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
}

const _transform = (arr) => {
    let newArr = [];
    arr.map((item, index) => {
        return newArr[index] = {const: item.const, id: item.id}
    });
    return newArr;
}

//default value of state
const reducer = (state = 0, action) => {
    switch (action.type) {
        case 'INC':
            return state + 1;
        case 'DEC':
            return state - 1;
        case 'RES':
            return action.value;
        case 'DLD':
            return action.random;
        case 'UPL':
            return state;
        default:
            return state;
    }
};

//action-creaters
const inc = () => ({type: 'INC'}),
    dec = () => ({type: 'DEC'}),
    res = (value) => ({type: 'RES', value}),
    dld = (random) => ({type: 'DLD', random}),
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

    delegate(btnDownload, event, () => {
        getResource('/numbers/')
            .then(res => _transform(res))
            .then(arr => {
                const rnd = Math.floor(Math.random() * 3);
                return +arr[rnd].const;
            })
            .then(num => {
                store.dispatch(dld(num))
            })
            .catch(err => console.error(err.message));
    });

    delegate(btnUpload, event, () => {
        getResource('/numbers/')
            .then(res => _transform(res))
            .then(arr => {
                const data = { saved: counterBlock.textContent, id: (arr[arr.length - 1].id + 1) };
                postResource('/numbers/', data);
            })
            .then(() => store.dispatch(upl()))
            .catch(err => console.error(err.message));
    })
})


const update = () => {
    counterBlock.textContent = store.getState();
    if ( store.getState() > (initialState - 17) && store.getState() < (initialState + 55) ) {
        counterBlock.style.width = `${width + (store.getState() - initialState) * 5}px`;
        counterBlock.style.height = `${height + (store.getState() - initialState) * 5}px`;
    }
}

store.subscribe(update);
