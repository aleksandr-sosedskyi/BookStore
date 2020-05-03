import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { CATALOG } from "./constants/routes";
import Catalog from './pages/catalog/Catalog';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route exact path={CATALOG} component={Catalog} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
