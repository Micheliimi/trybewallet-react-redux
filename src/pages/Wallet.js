import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Header from '../componentes/Header';
import Input from '../componentes/Input';
import Select from '../componentes/Select';
import Button from '../componentes/Button';
import Table from '../componentes/Table';
import { fetchAPICurr,
  addExpanseThunk,
  updateExpenses,
} from '../actions/index';
import sumExpenses from '../functions';

const ALIMENTACAO = 'Alimentação';
class Wallet extends React.Component {
  constructor() {
    super();

    this.state = {
      paymentsOptions: ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'],
      tagsOptions: [ALIMENTACAO, 'Lazer', 'Trabalho', 'Transporte', 'Saúde'],
      value: '0',
      coin: 'USD',
      payment: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
      editMode: false,
      indexExpense: 0,
      exchangeRates: {},
      id: 0,
    };

    this.handleChange = this.handleChange.bind(this);
    this.sendAction = this.sendAction.bind(this);
    this.deleteExpense = this.deleteExpense.bind(this);
    this.editExpense = this.editExpense.bind(this);
    this.finishedEdition = this.finishedEdition.bind(this);
  }

  componentDidMount() {
    const { getCurrencies } = this.props;
    getCurrencies();
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value })/* , () => this.validateForm() */);
  }

  sendAction() {
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
    this.setState({
      value: '0',
      coin: 'USD',
      payment: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
    });
  }

  editExpense(id) {
    const { expenses } = this.props;
    const editedExpense = expenses.filter((expense) => expense.id === id);
    const index = expenses.indexOf(editedExpense[0], 0);
    this.setState({
      editMode: true,
      value: editedExpense[0].value,
      coin: editedExpense[0].currency,
      payment: editedExpense[0].method,
      tag: editedExpense[0].tag,
      description: editedExpense[0].description,
      exchangeRates: editedExpense[0].exchangeRates,
      indexExpense: index,
      id: editedExpense[0].id,
    });
  }

  finishedEdition() {
    const { value,
      coin,
      payment,
      tag,
      description,
      indexExpense,
      exchangeRates,
      id,
    } = this.state;
    const { expenses, getUpdateExpenses } = this.props;
    const newObjExpenseEdited = { value,
      currency: coin,
      method: payment,
      tag,
      description,
      exchangeRates,
      id,
    };
    expenses.splice(indexExpense, 1, newObjExpenseEdited);
    const sum = sumExpenses(expenses);
    getUpdateExpenses(expenses, sum);
    this.setState({
      value: '0',
      coin: 'USD',
      payment: 'Dinheiro',
      tag: ALIMENTACAO,
      description: '',
      indexExpense: 0,
      exchangeRates: '',
      id: 0,
      editMode: false,
    });
  }

  deleteExpense(id) {
    const { expenses, getUpdateExpenses } = this.props;
    const deletedExpense = expenses.filter((expense) => expense.id !== id);
    const sum = sumExpenses(deletedExpense);
    getUpdateExpenses(deletedExpense, sum);
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
                onClick={ this.sendAction }
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
  currencies: PropTypes.arrayOf.isRequired,
  expenses: PropTypes.arrayOf.isRequired,
  dispatchAddExpanseThunk: PropTypes.func.isRequired,
  getUpdateExpenses: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  getCurrencies: () => dispatch(fetchAPICurr()),
  dispatchAddExpanseThunk: (expense) => dispatch(addExpanseThunk(expense)),
  getUpdateExpenses: (expense, sum) => dispatch(updateExpenses(expense, sum)),
});

const mapStateToProps = (state) => ({
  currencies: state.wallet.currencies,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
