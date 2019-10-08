import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Route as ReactRoute, Redirect } from 'react-router-dom';

import { appUrls } from 'urls';

const Route = ({ component: Component, layout: Layout, loginRequired, isAuthenticated, ...rest }) => {
  return (
    <ReactRoute {...rest} render={(props) =>
      (isAuthenticated || !loginRequired) ?
        Layout ?
          <Layout
            match={props.match}
            push={props.history.push}
          >
            <Component {...props} /></Layout> : <Component {...props} />
        :
        <Redirect to={appUrls.AUTH.SIGN_IN} />
    } />
  );
};

Route.propTypes = {
  component: PropTypes.any,
  layout: PropTypes.any,
  loginRequired: PropTypes.bool,
  isAuthenticated: PropTypes.bool,
  match: PropTypes.object,
  history: PropTypes.object
};

const mapStateToProps = (state) => {
  return {
    isAuthenticated: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Route);
