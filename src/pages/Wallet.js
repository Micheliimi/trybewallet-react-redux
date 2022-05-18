import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Input from '../componentes/Input';
import { fetchAPICurr } from '../actions/index';

class Wallet extends React.Component {
  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  render() {
    // const { currencies } = this.props;
    return (
      <div>
        TrybeWallet
        <Header />
        <hr />
        <div>
          <Input
            data="value-input"
            label="Valor: "
            type="number"
            onChange={ this.handleChange }
            // value={ value }
            name="value"
            required
          />
          select
          <Input
            data="description-input"
            label="Descrição: "
            type="text"
            onChange={ this.handleChange }
            // value={ description }
            name="description"
            required
          />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPICurr()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
