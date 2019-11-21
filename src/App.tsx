import React from 'react';
import './App.scss';
import { Switch, Route } from 'react-router-dom';
import { Header, AboutPage } from './components';
import { UserList, UserForm } from './containers';


const App: React.FC = () => {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path='/' exact component={UserForm} />
        <Route path='/about' exact component={AboutPage} />
        <Route path='/users' exact component={UserList} />
      </Switch>
    </div>
  );
}

export default App;
