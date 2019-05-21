import React from 'react';
import { Router, Route } from 'react-router';

import App from './components/App';
import Realtime from './components/Realtime';
import NotFound from './components/NotFound';

const Routes = (props) => (
  <Router {...props}>
    <Route path="/" component={App} />
    <Route path="/Realtime" component={Realtime} />
    <Route path="*" component={NotFound} />
  </Router>
);

export default Routes;