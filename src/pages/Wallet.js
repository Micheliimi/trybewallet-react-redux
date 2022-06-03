import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Input from '../componentes/Input';
import Select from '../componentes/Select';
import Button from '../componentes/Button';
import './Wallet.css';
import Table from '../componentes/Table';
import { fetchAPICurr,
  addExpanseThunk,
  editExpenseAction,
  deleteExpenseAction,
} from '../actions/index';

const INITIAL_STATE = {
  value: '0',
  coin: 'USD',
  payment: 'Dinheiro',
  tag: 'Alimentação',
  description: '',
  editMode: false,
  exchangeRates: {},
  id: 0,
};
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentsOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagsOptions: ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      ...INITIAL_STATE,
    };
  }

  componentDidMount = () => {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  clearSetState = () => {
    this.setState({
      ...INITIAL_STATE,
    });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  }

  sendAction = () => {
    const { value, coin, payment, tag, description } = this.state;
    const { expenses, dispatchAddExpanseThunk } = this.props;
    let id = 0;
    if (expenses.length > 0) {
      const ultimoEl = expenses[expenses.length - 1];
      id = ultimoEl.id + 1;
    }
    dispatchAddExpanseThunk({ value,
      currency: coin,
      method: payment,
      tag,
      description,
      id,
    });
    this.clearSetState();
  }

  editExpense = (expense) => {
    this.setState({
      editMode: true,
      value: expense.value,
      coin: expense.currency,
      payment: expense.method,
      tag: expense.tag,
      description: expense.description,
      exchangeRates: expense.exchangeRates,
      id: expense.id,
    });
  }

  finishedEdition = () => {
    const { value,
      coin,
      payment,
      tag,
      description,
      exchangeRates,
      id,
    } = this.state;
    const { editExpense } = this.props;
    const editedExpense = { value,
      currency: coin,
      method: payment,
      tag,
      description,
      exchangeRates,
      id,
    };

    editExpense(editedExpense);
    this.clearSetState();
  }

  deleteExpense = (id) => {
    const { deleteExpense } = this.props;
    deleteExpense(id);
  }

  render() {
    const { currencies, expenses } = this.props;
    const { paymentsOptions,
      tagsOptions,
      value,
      coin,
      payment,
      description,
      tag,
      editMode,
    } = this.state;
    return (
      <div className="container_wallet">
        <Header />
        <div>
          <Input
            className="input_value_wallet"
            data="value-input"
            label="Valor: "
            type="number"
            onChange={ this.handleChange }
            value={ value }
            name="value"
            required
          />
          <Select
            className="select_coin_wallet"
            data="currency-input"
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
          {editMode
            ? (
              <Button
                type="button"
                label="Editar despesa"
                onClick={ this.finishedEdition }
                disabled={ false }
              />
            )
            : (
              <Button
                type="button"
                label="Adicionar despesa"
                onClick={ this.reacticons
                 }
                disabled={ false }
              />)}
        </div>
        <Table
          expenses={ expenses }
          editExpense={ this.editExpense }
          deleteExpense={ this.deleteExpense }
        />
      </div>
    );
  }
}

Wallet.propTypes = {
  getCurrencies: PropTypes.func.isRequired,
  currencies: PropTypes.arrayOf(PropTypes.string).isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  dispatchAddExpanseThunk: PropTypes.func.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPICurr()),
  dispatchAddExpanseThunk: (expense) => dispatch(addExpanseThunk(expense)),
  editExpense: (editedExpense) => dispatch(editExpenseAction(editedExpense)),
  deleteExpense: (id) => dispatch(deleteExpenseAction(id)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
