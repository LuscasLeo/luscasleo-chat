import 'bootstrap/scss/bootstrap.scss';
import React from 'react';
import { hot } from 'react-hot-loader/root';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Chat from './components/Chat';
import Login from './components/Login';
import './dracula.css';
import './style.scss';
const App: React.FC<{}> = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/chat" component={Chat} />
      </Switch>
    </BrowserRouter>
  );
};
export default hot(App);
