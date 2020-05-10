import React from 'react';
import { connect } from 'react-redux';
import { selectedProduct, removeProduct } from '../../actions/actions';
import './Product.css';
import remove from '../../assets/close.png';

const Product = props => {
        const { product, products, onSelectProduct, selectedProducts } = props;
        let productsSelectBox = !product ? <select value="" onChange={onSelectProduct}>
            <option value="">Choose a Product</option>
            {products.map(product => {
                let disableOption;
                if (selectedProducts.includes(product.id)) disableOption = true
                return (
                    <option
                        disabled={disableOption}
                        value={product.id}>
                        {product.title}
                    </option>
                )
            })}
        </select> : '';

        return <>
            <tr className='product-col'>
                <td className="img-container">
                    {product && product.image &&
                        <><img alt={product.title} src={product.image} class="product-img" />
                            <img onClick={() => props.onRemoveProduct(product.id)}
                                class="img-remove"
                                src={remove}
                                alt="remove product" />
                            <h4 className="product-title">{product.title}</h4>
                            <p>
                                <span className="product-final-price">₹{product.finalPrice} </span>
                                <span className="product-price">₹{product.price}</span>
                                <span className="product-discount"> {product.totalDiscount}%off</span>
                            </p>
                        </>
                    }
                </td>
                <td>{productsSelectBox}</td>
                <td className="feature-heading"></td>
                <td>{product && product.size}</td>
                <td>{product && product.screenType}</td>
                <td>{product && product.hdTech}</td>
                <td>{product && product.threeD}</td>
                <td className="feature-heading"></td>
                <td>{product && product.smartTv}</td>
                <td>{product && product.curveTv}</td>
                <td>{product && product.touchScreen}</td>
                <td>{product && product.motionSensor}</td>
                <td>{product && product.launchYear}</td>
                <td className="feature-heading"></td>
                <td>{product && product.wifi}</td>
                <td>{product && product.threeG}</td>
                <td>{product && product.ethernet}</td>
                <td>{product && product.wireless}</td>
            </tr>
        </>
}

const mapStateToProps = state => ({
    selectedProducts: state.selectedProducts
})

const mapDispatchToProps = dispatch => {
    return {
        onSelectProduct: event => dispatch(selectedProduct(event.target.value)),
        onRemoveProduct: id => dispatch(removeProduct(id))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Product);