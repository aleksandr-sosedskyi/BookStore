import React, { Component } from 'react';
import { Provider } from 'react-redux';
import store from './store';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { CATALOG, DETAIL_BOOK } from "./constants/routes";
import Catalog from './pages/catalog/Catalog';
import { loadUser } from "./actions/auth";
import BookDetail from "./pages/bookDetail/BookDetail";


class App extends Component {
  componentDidMount () {
    store.dispatch(loadUser());
  }

  render() {
    return (
      <Provider store={store}>
        <BrowserRouter>
          <Switch>
            <Route path={`${CATALOG}/:genre/`} component={Catalog} />
            <Redirect from={CATALOG} to={`${CATALOG}/all/`} />
            <Route path={`${DETAIL_BOOK}/:book/`} component={BookDetail} />
            <Redirect exact from={DETAIL_BOOK} to={`${CATALOG}/all/`} />
          </Switch>
        </BrowserRouter>
      </Provider>
    )
  }
}

export default App;
