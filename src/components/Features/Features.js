import React from 'react';
import { connect } from 'react-redux';
import Product from '../Product/Product';
import './Features.css';

const Features = props => {
    const { featuresList, allProducts, selectedProducts } = props;
    let featureHeader = [], productsToCompare = [];
    selectedProducts.map(id => {
        allProducts.filter(product => {
            if (id === product.id) productsToCompare.push(product);
        });
    });
    featuresList.map((feature, index) => {
        if (featuresList.indexOf(feature) === index) {
            featureHeader.push(<td className="feature-heading" key={index}>{feature.title}</td>)
            feature.features.map((subFeature, key) => {
                featureHeader.push(<td key={subFeature.featureName}>{subFeature.featureName}</td>);
            })
        }
    })

    return <div className="containers">
        <table>
            <tbody>
                <tr>
                    <td className='feature-heading-top'>
                        <h2>Compare</h2>
                        <p>{selectedProducts ? selectedProducts.length : 0} items selected</p>
                    </td>
                    {featureHeader}
                </tr>
                {productsToCompare.map(product => {
                    return <Product key={product.id} products={allProducts} product={product} />
                })}
                {selectedProducts.length < allProducts.length && <Product products={allProducts} />}
            </tbody>
        </table>
    </div>
}

const mapStateToProps = state => {
    return {
        selectedProducts: state.selectedProducts,
        allProducts: state.initialProducts,
        featuresList: state.featuresList,
        compareSummary: state.compareSummary
    }
}
export default connect(mapStateToProps)(Features);