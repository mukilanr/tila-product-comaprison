import * as actionTypes from './actionTypes';
import * as constants from '../constants/constants';
import axios from 'axios';

export const fetchData = () => {
    return dispatch => {
        axios.get('https://www.mocky.io/v2/5e9ebdaa2d00007800cb7697')
            .then(response => {
                const productDetails = response.data.products.compareSummary.titles;
                let products = [];
                Object.entries(productDetails).map(([key, value]) => {
                    let product = {};
                    product.id = key;
                    product.titles = value;
                    products.push(product);
                });
                const parsedProducts = parseProductData(response.data.products, products);
                dispatch({
                    type: actionTypes.FETCH_DATA,
                    payload: response.data,
                    initialProducts: parsedProducts
                });
            })
            .catch(error => {
                console.log(error);
            })
    }
}

const parseProductData = (data, products) => {
    let productsObj = [];
    products && products.map(selectedProduct => {
        let product = {};
        product.id = selectedProduct.id;
        data.featuresList.map(features => {
            features.features.map(feature => {
                Object.entries(feature.values).map(([key, value]) => {
                    if (selectedProduct.id === key) {
                        if (feature.featureName === constants.SIZE) product.size = value
                        if (feature.featureName === constants.SCREEN_TYPE) product.screenType = value
                        if (feature.featureName === constants.HD_TECH) product.hdTech = value
                        if (feature.featureName === constants.THREE_D) product.threeD = value
                        if (feature.featureName === constants.SMART_TV) product.smartTv = value
                        if (feature.featureName === constants.CURVE_TV) product.curveTv = value
                        if (feature.featureName === constants.TOUCHSCREEN) product.touchScreen = value
                        if (feature.featureName === constants.MOTION_SENSOR) product.motionSensor = value
                        if (feature.featureName === constants.LAUNCH_YEAR) product.launchYear = value
                        if (feature.featureName === constants.WIFI) product.wifi = value
                        if (feature.featureName === constants.THREE_G) product.threeG = value
                        if (feature.featureName === constants.ETHERNET) product.ethernet = value
                        if (feature.featureName === constants.WIRELESS) product.wireless = value
                    }
                })
            })
        })
        Object.entries(data.compareSummary).map(([feature, value]) => {
            Object.entries(value).map(([id, val]) => {
                if (selectedProduct.id === id) {
                    if (feature === 'images') product.image = val;
                    if (feature === 'titles')
                        product.title = val.title;
                        product.subTitle = val.subtitle;
                    if (feature === 'productPricingSummary') { 
                        product.finalPrice = val.finalPrice;
                        product.totalDiscount = val.totalDiscount; 
                        product.price = val.price;
                    }
                }
            })
        })
        productsObj.push(product);
    }
    );
    return productsObj;
}

export const selectedProduct = (product) => {
    return (dispatch, getState) => {
        const state = getState();
        if(product && !state.selectedProducts.includes(product))
            dispatch({
                type: actionTypes.SELECTED_PRODUCTS,
                payload: product
            });
    }
}

export const removeProduct = (id) => {
    return (dispatch, getState) => {
        const state = getState();
        const products = state.selectedProducts.filter(product => {
            return product !== id;
        });
        dispatch({
            type: actionTypes.REMOVE_PRODUCT,
            payload: products
        });
    }
}