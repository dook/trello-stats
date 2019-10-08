import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import AppLayout from 'base/layouts/AppLayout';
import NotFoundView from 'modules/common/views/NotFoundView/NotFoundView';
import SignInView from 'modules/auth/views/SignInView';

import { appUrls } from 'urls';
import BoardsView from '../../modules/boards/views/BoardsView';
import BoardDetailsView from 'modules/boards/views/BoardDetailsView';
import SettingsView from 'modules/boards/views/SettingsView';

const Routes = () => {
  return (
    <Switch>
      <Route exact={true} path={appUrls.AUTH.SIGN_IN} component={SignInView} />
      <Route exact={true} path={appUrls.ROOT} component={BoardsView} layout={AppLayout} loginRequired />
      <Route exact={true} path={appUrls.BOARDS.LIST} component={BoardDetailsView} layout={AppLayout} loginRequired />
      <Route exact={true} path={appUrls.BOARDS.SETTINGS} component={SettingsView} layout={AppLayout} loginRequired />
      <Route component={NotFoundView} layout={AppLayout} loginRequired />
    </Switch>
  );
};

export default Routes;
