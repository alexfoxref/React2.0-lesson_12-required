//default value of state
const reducer = (state = {
        counter: 0, 
        size: {
            width: 300, 
            height: 300
        }
    }, action) => {
    
    const {counter, size: {width, height}} = state,
        {type, counterReset, sizeReset
            // , random
            } = action;

    switch (type) {
        case 'INC':
            return {
                counter: counter + 1, 
                size: {
                    width: width + 5,
                    height: height + 5
                }};
        case 'DEC':
            return {
                counter: counter - 1, 
                size: {
                    width: width - 5,
                    height: height - 5
                }};
        case 'RES':
            return {
                counter: counterReset, 
                size: {
                    width: sizeReset.width,
                    height: sizeReset.height
                }};
        // case 'DLD':
        //     return random;
        // case 'UPL':
        //     return state;
        default:
            return state;
    }
};

export default reducer;