import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Input from '../componentes/Input';
import Select from '../componentes/Select';
import Button from '../componentes/Button';
import { fetchAPICurr, addExpanse, addExpanseThunk } from '../actions/index';

// const INITIAL_STATE = {
//   value: '0',
//   coin: 'USD',
//   payment: 'Dinheiro',
//   tag: 'Alimentação',
//   description: '',
// }
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentsOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagsOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      value: '0',
      coin: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
      // expenses: [],
      // resultAPI: {},
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendAction = this.sendAction.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value })/* , () => this.validateForm() */);
  }

  async sendAction() {
    const { value, coin, payment, tag, description } = this.state;
    const { expenses, dispatchAddExpanseThunk } = this.props;
    // this.setState((preventState) => ({
    //   expenses: [...preventState.expenses,
    //     { id: expenses.length, value, coin, payment, tag, description }],
    // }));
    let id = 0;
    if (expenses.length > 0) {
      const ultimoEl = expenses[expenses.length - 1];
      id = ultimoEl.id + 1;
    }

    // 0, 1, , , 4, 5, ?
    // const exchangeRates = await fetchAPI();
    // dispatchAddExpanse({ value, currency: coin, method: payment, tag, description, exchangeRates, id });
    dispatchAddExpanseThunk({ value, currency: coin, method: payment, tag, description, id });

    this.setState({
      value: '0',
      coin: 'USD',
      payment: 'Dinheiro',
      tag: 'Alimentação',
      description: '',
    });
    // const { addUser } = this.props;
    // addUser(email);
    // const { history } = this.props;
    // history.push('/carteira'); // Usar history.push para redirecionar!
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
          <Button
            type="button"
            label="Adicionar despesa"
            onClick={ this.sendAction }
            disabled={ false }
          />
        </div>
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf.isRequired,
  dispatchAddExpanse: PropTypes.func.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  dispatchAddExpanseThunk: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPICurr()),
  dispatchAddExpanse: (expanse) => dispatch(addExpanse(expanse)),
  dispatchAddExpanseThunk: (expanse) => dispatch(addExpanseThunk(expanse)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
