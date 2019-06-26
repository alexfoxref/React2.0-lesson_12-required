//action-creaters
export const inc = () => ({type: 'INC'});
export const dec = () => ({type: 'DEC'});
export const res = (counterReset, sizeReset) => (
        {
            type: 'RES', 
            counterReset, 
            sizeReset: 
                {
                    width: sizeReset.width, 
                    height: sizeReset.height
                }
        }
    );
// export const dld = (random) => ({type: 'DLD', random});
// export const upl = () => ({type: 'UPL'});