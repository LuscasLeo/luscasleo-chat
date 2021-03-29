import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import './dracula.css';
import './style.scss';
import store from './store';
const App: React.FC<{}> = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Switch>
          <Route path="/" exact component={Login} />
          <Route path="/chat" component={Chat} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
export default hot(App);
