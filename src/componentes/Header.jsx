import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

class Header extends React.Component {
  render() {
    const { email, expenses } = this.props;
    const sumValue = expenses.reduce((acumulador, valorAtual) => {
      const result = Number(valorAtual
        .value) * Number(valorAtual
        .exchangeRates[valorAtual.currency].ask);
      acumulador += result;
      return acumulador;
    }, 0);

    return (
      <div>
        <h3 data-testid="email-field">{ email }</h3>
        <h3 data-testid="total-field">
          { sumValue.toFixed(2) }
        </h3>
        <h3 data-testid="header-currency-field">BRL</h3>
      </div>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string.isRequired,
  expenses: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => ({
  email: state.user.email,
  sumState: state.wallet.sumExpenses,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
