import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class ListTile extends React.Component {
  render() {
    const { name, onClick, index, isActive } = this.props;
    const buttonClasses = cx('list-tile__button', { 'list-tile__button--active': isActive });
    return (
      <li
        className="list-tile"
        style={{
          animationDelay: (index * 15) + 'ms'
        }}
      >
        <button className={buttonClasses} onClick={onClick}>{name}</button>
      </li>
    );
  }
}

ListTile.propTypes = {
  name: PropTypes.string,
  handleClick: PropTypes.func,
  isActive: PropTypes.bool,
  onClick: PropTypes.func,
  index: PropTypes.number
};

export default ListTile;
