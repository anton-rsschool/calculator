/* eslint-disable react/no-array-index-key */
import React from 'react';
import PropTypes from 'prop-types';

import './BtnBar.scss';

const BtnBar = ({
  label,
  itemsList,
  currentItem,
  onClickBtn,
  name,
}) => {
  const items = itemsList.map((item, index) => (
    <button
      className={`btn-bar__button${currentItem === item.value ? ' btn-bar__button--active' : ''}`}
      key={index}
      type="button"
      onClick={() => { onClickBtn({ [name]: item.value }); }}
    >
      {item.name}
    </button>
  ));
  return (
    <div className="btn-bar">
      <p className="btn-bar__label">{label}</p>
      <div className="btn-bar__list">{items}</div>
    </div>
  );
};

BtnBar.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  currentItem: PropTypes.number.isRequired,
  itemsList: PropTypes.arrayOf(PropTypes.any).isRequired,
  onClickBtn: PropTypes.func.isRequired,
};

export default BtnBar;
