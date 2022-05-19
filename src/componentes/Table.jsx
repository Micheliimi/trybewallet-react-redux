import React, { Component } from 'react';
// import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Button from './Button';

class Table extends Component {
  render() {
    const { expenses, editExpense, deleteExpense } = this.props;
    console.log(expenses);
    return (
      <table>
        <tr>
          <th>
            Descrição
          </th>
          <th>
            Tag
          </th>
          <th>
            Método de pagamento
          </th>
          <th>
            Valor
          </th>
          <th>
            Moeda
          </th>
          <th>
            Câmbio utilizado
          </th>
          <th>
            Valor convertido
          </th>
          <th>
            Moeda de conversão
          </th>
          <th>
            Editar/Excluir
          </th>
        </tr>
        {expenses.length > 0 && expenses.map((expense) => {
          console.log(expenses);
          const conversao = Number(expense
            .value) * Number(expense
            .exchangeRates[expense.currency].ask);
          const result = (Math.round(expense.value * 100) / 100);
          return (
            <tr key={ expense.id }>
              <td>{ expense.description }</td>
              <td>{ expense.tag }</td>
              <td>{ expense.method }</td>
              <td>{ result.toFixed(2) }</td>
              <td>{ expense.exchangeRates[expense.currency].name }</td>
              <td>
                {
                  Number(expense.exchangeRates[expense.currency].ask).toFixed(2)
                }
              </td>
              <td>{ conversao.toFixed(2).toString() }</td>
              <td>Real</td>
              <td>
                <Button
                  type="button"
                  label="Editar"
                  onClick={ () => editExpense(expense.id) }
                  disabled={ false }
                  data="edit-btn"
                />
                <Button
                  type="button"
                  label="Excluir"
                  onClick={ () => deleteExpense(expense.id) }
                  disabled={ false }
                  data="delete-btn"
                />
              </td>
            </tr>
          );
        })}
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf.isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

// const mapStateToProps = (state) => ({
//   expenses: state.wallet.expenses,
// });

// export default connect(mapStateToProps)(Table);
export default Table;
