import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import queryString from 'query-string';
import { env } from 'config';
import { authActions } from 'modules/auth/redux/actions';
import logo from 'assets/images/logo.svg';

const REDIRECT = `${env.API_URL}auth/login?redirect=${window.location.origin}/signin`;

class SignInView extends React.Component {
  componentDidMount() {
    const { dispatch } = this.props;
    const parsed = queryString.parse(this.props.location.search);
    if (parsed.token) {
      dispatch(authActions.setToken(parsed.token));
    }
  }

  render() {
    return (
      <div className="signin">
        <h1 className="signin__logo">
          <img className="signin__logo__img" src={logo} alt="Trello Stats" />
        </h1>
        <a
          className="signin__button"
          href={REDIRECT}>
          <span>Sign in with Trello</span>
          <span className="signin__button__icon material-icons">keyboard_arrow_right</span>
        </a>
      </div>
    );
  }
}

SignInView.propTypes = {
  dispatch: PropTypes.func,
  isFetching: PropTypes.bool,
  location: PropTypes.object,
  history: PropTypes.object
};

export default connect()(SignInView);
