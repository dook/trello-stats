import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class TopbarMenu extends Component {
  $topbar = React.createRef();

  componentDidMount() {
    document.addEventListener('mouseup', this.handleClick);
  }

  componentWillUnmount() {
    document.removeEventListener('mouseup', this.handleClick);
  }

  handleClick = (e) => {
    if (!this.$topbar.current.contains(e.target)) {
      this.props.onClose(e);
    }
  }

  render() {
    const { user, onLogout } = this.props;
    return (
      <div ref={this.$topbar} className="topbar-menu">
        <p className="topbar-menu__fullname">{user.fullName}</p>
        <p className="topbar-menu__username"> ({user.username})</p>
        <button className="topbar-menu__button" onClick={onLogout}>
          LOGOUT
        </button>
      </div>
    );
  }
}

TopbarMenu.propTypes = {
  user: PropTypes.object,
  onClose: PropTypes.func,
  onLogout: PropTypes.func,
};
