import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Select extends Component {
  render() {
    const {
      label,
      name,
      onChange,
      value,
      id,
      defaultOption,
      defaultValue,
      options,
      data,
    } = this.props;
    return (
      <label htmlFor={ name }>
        { label }
        <select
          data-testid={ data }
          name={ name }
          id={ id }
          required
          onChange={ onChange }
          value={ value }
        >
          {
            options.map((option, index) => (
              <option key={ index }>{ option }</option>
            ))
          }
        </select>
      </label>
    );
  }
}

Select.propTypes = {
  data: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  value: PropTypes.string.isRequired,
  options: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  defaultValue: PropTypes.string,
};

Select.defaultProps = {
  defaultValue: '',
};

export default Select;