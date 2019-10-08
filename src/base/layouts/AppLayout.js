import React from 'react';
import PropTypes from 'prop-types';

import Topbar from 'modules/common/components/Topbar/Topbar';

class AppLayout extends React.Component {
  render() {
    const { children } = this.props;

    return (
      <>
        <Topbar
          path={this.props.match.path}
          push={this.props.push}
          id={this.props.match.params.id || null}
        />
        <div className="main">
          {children}
        </div>
      </>
    );
  }
}

AppLayout.propTypes = {
  children: PropTypes.node,
  match: PropTypes.object,
  push: PropTypes.func
};

export default AppLayout;
