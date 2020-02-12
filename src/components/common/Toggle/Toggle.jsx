import React from 'react';
import PropTypes from 'prop-types';

const Toggle = ({ flag, renderComponent1, renderComponent2 }) => {
  const component = flag ? renderComponent1() : renderComponent2();
  return (
    <div>
      {component}
    </div>
  );
};

Toggle.propTypes = {
  flag: PropTypes.bool.isRequired,
  renderComponent1: PropTypes.func.isRequired,
  renderComponent2: PropTypes.func.isRequired,
};

export default Toggle;
