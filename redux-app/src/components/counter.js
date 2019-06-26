import React from 'react';
import imgPlus from '../img/Plus.png';
import imgMinus from '../img/Minus.png';
import imgReset from '../img/Reset.png';
// import imgDownload from '../img/Download Icon.png';
// import imgUpload from '../img/Upload Icon.png';
import {connect} from 'react-redux';
import * as actions from '../actions';
import {bindActionCreators} from 'redux';
// import {getResource, postResource, transform} from '../services';


const Counter = ({counter, size: {width, height}, inc, dec, res
    // , dld, upl
    }) => {

    return (
        <div className="container">
            <div className="counter-wrapper">
                <div style={{width:`${width}px`, height:`${height}px`}} className="counter-block">
                    {counter}
                </div>
                <div className="btn-block">
                    <button onClick={inc} className="btn btn-plus"><img src={imgPlus} alt="Plus"></img></button>
                    <button onClick={dec} className="btn btn-minus"><img src={imgMinus} alt="Minus"></img></button>
                    <button onClick={res} className="btn btn-reset"><img src={imgReset} alt="Reset"></img></button>
                    {/* <button onClick={dld} className="btn btn-download"><img src={imgDownload} alt="Download"></img></button>
                    <button onClick={upl} className="btn btn-upload"><img src={imgUpload} alt="Upload"></img></button> */}
                </div>
            </div>
        </div>
    )
}


const mapStateToProps = ({counter, size: {width, height}}) => {
    return {
        counter,
        size: {
            width,
            height
        }
    }
};

const mapDispatchToProps = (dispatch) => {
    const {inc, dec, res
        // , dld, upl
        } = bindActionCreators(actions, dispatch);

    return {
        inc,
        dec,
        res: () => res(0, {width: 300, height: 300}),
        // dld: () => {
        //     getResource('/numbers/')
        //         .then(res => transform(res))
        //         .then(arr => {
        //             const rnd = Math.floor(Math.random() * arr.length);
        //             return +arr[rnd].const;
        //         })
        //         .then(num => {
        //             // console.log('dld');
        //             dld(num)
        //         })
        //         .catch(err => console.error(err.message));
        //     },
        // upl: () => {
        //     getResource('/numbers/')
        //         .then(res => transform(res))
        //         .then(arr => {
        //             // просто для примера 1
        //             const data = { saved: `${1}`, id: (arr[arr.length - 1].id + 1) };
        //             postResource('/numbers/', data);
        //         })
        //         .then(() => {
        //             // console.log('upl');
        //             upl()
        //         })
        //         .catch(err => console.error(err.message));
        //     }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Counter);