import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/**
 * Scrolls page to top after location change.
 * https://reacttraining.com/react-router/web/guides/scroll-restoration
 */
class ScrollToTop extends React.Component {
  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      window.scrollTo(0, 0);
    }
  }

  render() {
    return this.props.children;
  }
}

ScrollToTop.propTypes = {
  children: PropTypes.node,
  location: PropTypes.object
};

export default withRouter(ScrollToTop);
