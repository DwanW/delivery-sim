import React from 'react';
import { Switch, Route } from 'react-router-dom';

import HomePage from './pages//homepage';

const App = () => {
  return (
    <div className="root">
      <Switch>
        <Route exact path='/' component={HomePage} />
      </Switch>
    </div>
  );
}

export default App;
