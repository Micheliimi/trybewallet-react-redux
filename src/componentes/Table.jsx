import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from './Button';

class Table extends Component {
  render() {
    const { expenses, editExpense, deleteExpense } = this.props;
    return (
      <table>
        <thead>
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
        </thead>
        <tbody>
          {expenses.length > 0 && expenses.map((expense) => {
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
                    onClick={ () => editExpense(expense) }
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
        </tbody>
      </table>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteExpense: PropTypes.func.isRequired,
  editExpense: PropTypes.func.isRequired,
};

export default Table;
