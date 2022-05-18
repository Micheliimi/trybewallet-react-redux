import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../componentes/Input';
import Button from '../componentes/Button';
import { getUser } from '../actions/index';

class Login extends React.Component {
  constructor() {
    super();

    this.state = {
      email: '',
      password: '',
      isSaveButtonDisabled: true,
    };

    this.handleChange = this.handleChange.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.validateForm = this.validateForm.bind(this);
    this.sendAction = this.sendAction.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value }), () => this.validateForm());
  }

  validateForm() {
    // console.log('alou');
    const { email, password } = this.state;
    const re = /\S+@\S+\.\S+/;
    const number = 6;
    if (password.length >= number && re.test(email)) {
      this.setState({
        isSaveButtonDisabled: false,
      });
    } else {
      this.setState({
        isSaveButtonDisabled: true,
      });
    }
  }

  sendAction() {
    const { email } = this.state;
    const { addUser } = this.props;
    addUser(email);
    const { history } = this.props;
    history.push('/carteira'); // Usar history.push para redirecionar!
  }

  render() {
    const { isSaveButtonDisabled, email, password } = this.state;
    return (
      <div>
        <Input
          data="email-input"
          label="email: "
          type="text"
          onChange={ this.handleChange }
          value={ email }
          name="email"
          required
        />
        <Input
          data="password-input"
          label="senha: "
          type="password"
          onChange={ this.handleChange }
          value={ password }
          name="password"
          required
        />
        <Button
          type="button"
          label="Entrar"
          onClick={ this.sendAction }
          disabled={ isSaveButtonDisabled }
        />
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
  addUser: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  addUser: (email) => dispatch(getUser(email)) });

export default connect(null, mapDispatchToProps)(Login);
