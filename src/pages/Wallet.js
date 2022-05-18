import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Input from '../componentes/Input';
import Select from '../componentes/Select';
import { fetchAPICurr } from '../actions/index';

class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentsOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagsOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      value: '0',
      coin: '',
      payment: '',
      tag: '',
      description: '',
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value })/* , () => this.validateForm() */);
  }

  render() {
    const { currencies } = this.props;
    const { paymentsOptions,
      tagsOptions,
      value,
      coin,
      payment,
      description,
      tag,
    } = this.state;
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
            value={ value }
            name="value"
            required
          />
          <Select
            data="coin-input"
            onChange={ this.handleChange }
            value={ coin }
            label="Moeda: "
            id="coin"
            name="coin"
            options={ currencies }
          />
          <Select
            data="method-input"
            onChange={ this.handleChange }
            value={ payment }
            label="Método de pagamento: "
            id="payment"
            name="payment"
            options={ paymentsOptions }
          />
          <Select
            data="tag-input"
            onChange={ this.handleChange }
            value={ tag }
            label="Categoria: "
            id="tag"
            name="tag"
            options={ tagsOptions }
          />
          <Input
            data="description-input"
            label="Descrição: "
            type="text"
            onChange={ this.handleChange }
            value={ description }
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
  currencies: PropTypes.arrayOf.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPICurr()),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
