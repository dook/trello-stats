import React from 'react';
import { Link } from 'react-router-dom';
import { appUrls } from 'urls';

const NotFoundView = () => {
  return (
    <div className="not-found-view">
      <p className="not-found-view__error-number">404</p>
      <h2 className="not-found-view__heading">Page not found</h2>
      <p className="not-found-view__description">Sorry, we could not find what you are looking for...</p>
      <Link to={appUrls.ROOT} className="not-found-view__button">
        Go to homepage
      </Link>
    </div>
  );
};

export default NotFoundView;
