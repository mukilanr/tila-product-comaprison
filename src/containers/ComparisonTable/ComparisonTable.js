import React, { Component } from 'react';
import { connect } from 'react-redux';
import Features from '../../components/Features/Features';
import { fetchData } from '../../actions/actions'

class ComparisonTable extends Component {
    componentDidMount() {
        this.props.onFetchData();
    }

    render() {
        const { featuresList } = this.props;
        return  featuresList && <Features />
    }
}

const mapStateToProps = state => {
    return {
        featuresList: state.featuresList,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchData: () => dispatch(fetchData())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ComparisonTable);