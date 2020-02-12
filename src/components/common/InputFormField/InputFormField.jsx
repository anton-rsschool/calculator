import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './InputFormField.scss';

class InputFormField extends Component {
  constructor() {
    super();
    this.state = {
      value: '',
      isValid: true,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleBlur = this.handleBlur.bind(this);
  }

  componentDidMount() {
    const { value } = this.props;
    this.setState({ value });
  }

  handleBlur() {
    const { name, onChangeValue, validation } = this.props;
    const { isValid, value } = this.state;
    if (isValid) {
      onChangeValue({ [name]: +value });
      validation(name, true);
    } else {
      validation(name, false);
    }
  }

  handleErrors(value) {
    const { rules } = this.props;
    if (rules) {
      if (rules[0](value)) {
        this.setState({ isValid: true });
      } else {
        this.setState({ isValid: false });
      }
    }
  }

  handleChange(event) {
    const { target: { value } } = event;
    const newValue = value.replace(/[^.\d]/g, '');
    this.setState({ value: newValue });
    this.handleErrors(newValue);
  }

  render() {
    const {
      label,
      name,
      row,
      mask,
      maskPos,
      rules,
    } = this.props;
    const { value, isValid } = this.state;

    let maskClass = 'input__mask';
    if (mask) {
      maskClass = maskPos === 'left' ? `${maskClass} input__mask--left` : `${maskClass} input__mask--right`;
    }
    let inputClass = 'input__input';
    if (maskPos === 'right') {
      inputClass = `${inputClass} input__input--right`;
    }

    return (
      <div className={`input${row ? ' input--row' : ''}`}>
        <div className={`input__body${row ? ' input__body--row' : ''}`}>
          <label className="input__label" htmlFor={name}>{label}</label>
          <div className="input__wrapper">
            <p className={maskClass}>{mask}</p>
            <input
              className={inputClass}
              type="text"
              id={name}
              name={name}
              value={value}
              onChange={this.handleChange}
              onBlur={this.handleBlur}
            />
          </div>
        </div>
        {isValid || (
          <div className="input__error">
            {rules[1]}
          </div>
        )}
      </div>
    );
  }
}

InputFormField.propTypes = {
  label: PropTypes.string.isRequired,
  mask: PropTypes.string,
  maskPos: PropTypes.string,
  name: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  onChangeValue: PropTypes.func.isRequired,
  rules: PropTypes.arrayOf(PropTypes.any),
  row: PropTypes.bool,
  validation: PropTypes.func,
};

InputFormField.defaultProps = {
  row: false,
  mask: '',
  maskPos: 'left',
  rules: [() => true, ''],
  validation: () => true,
};

export default InputFormField;
