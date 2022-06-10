import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../componentes/Input';
import Button from '../componentes/Button';
import { getUser } from '../actions/index';
import './Login.css';

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
    this.sendAction = this.sendAction.bind(this);
  }

  handleChange({ target }) {
    const { name, value } = target;
    this.setState(({ [name]: value }), () => this.validateForm());
  }

  validateForm() {
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
    history.push('/carteira'); 
  }

  render() {
    const { isSaveButtonDisabled, email, password } = this.state;
    return (
      <div className="login">
        <section className="section_apresentation">
          <h2>
            A melhor experiência
            com carteira de controle de gastos com conversor de moedas que existe.
          </h2>
        </section>
        <section className="section_login">
          <div>
            <img
              src="https://img.freepik.com/fotos-gratis/foto-de-estudio-de-gengibre-hippie-com-barba-grossa-corte-de-cabelo-da-moda-tem-uma-expressao-seria-aponta-com-o-dedo-indicador-no-canto-superior-direito_273609-18616.jpg?t=st=1653313714~exp=1653314314~hmac=1dcbeefb137f93831c762e564541106002c078350101a5ec8af8ff7f3b02a304&w=1060"
              alt="Foto de estúdio de gengibre hippie com barba grossa. Foto gratuita"
              width="600px"
            />
          </div>
          <div className="login_container">
            <div className="login_form_inputs">
              <Input
                className="login_input_email input"
                data="email-input"
                label="Email: "
                type="text"
                onChange={ this.handleChange }
                value={ email }
                name="email"
                required
              />
              <Input
                className="login_input_password input"
                data="password-input"
                label="Senha: "
                type="password"
                onChange={ this.handleChange }
                value={ password }
                name="password"
                required
              />
            </div>

            <Button
              className="login_input_button button"
              type="button"
              label="Entrar"
              onClick={ this.sendAction }
              disabled={ isSaveButtonDisabled }
            />
          </div>
        </section>
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
