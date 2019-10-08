import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { appUrls, getBackUrl } from 'urls';
import { boardsActions } from 'modules/boards/redux/actions';
import { authActions } from 'modules/auth/redux/actions';

import UserAvatar from '../UserAvatar/UserAvatar';
import TopbarMenu from './TopbarMenu';
import logo from 'assets/images/logo.svg';

class Topbar extends PureComponent {
  state = {
    isOpen: false
  };
  $button = React.createRef();

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(boardsActions.fetchMe());
  }

  handleLogout = () => {
    const { dispatch } = this.props;
    dispatch(authActions.signOut());
  }

  toggleMenu = () => {
    this.setState((prevState) => ({ isOpen: !prevState.isOpen }));
  }

  handleClose = (e) => {
    if (e.target !== this.$button.current) {
      this.setState({ isOpen: false });
    }
  }

  render() {
    const { pathname, user } = this.props;
    const { isOpen } = this.state;
    const backUrl = getBackUrl(pathname);

    return (
      <div className="topbar">
        <div className="topbar-container">
          {backUrl && (
            <Link className="topbar__back" to={backUrl}>
              <i className="topbar__back__icon material-icons">keyboard_backspace</i>
            </Link>
          )}
          <button ref={this.$button} className="topbar__avatar" onClick={this.toggleMenu}>
            <UserAvatar img={user.avatar} name={user.fullName} isSmall={true} />
          </button>
          {isOpen && (
            <TopbarMenu
              user={user}
              onClose={this.handleClose}
              onLogout={this.handleLogout}
            />
          )}
          <Link to={appUrls.ROOT}>
            <h1 className="topbar__logo">
              <img src={logo} alt="Trello Stats" />
            </h1>
          </Link>
        </div>
      </div>
    );
  }
}

Topbar.propTypes = {
  pathname: PropTypes.string,
  dispatch: PropTypes.func,
  push: PropTypes.func,
  user: PropTypes.object,
  id: PropTypes.string
};

const mapStateToProps = ({ boards, router }) => {
  return {
    user: boards.user.list.data || {},
    pathname: router.location.pathname
  };
};

export default connect(mapStateToProps)(Topbar);
