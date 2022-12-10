import React from 'react';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {ApolloClient, ApolloProvider, InMemoryCache} from '@apollo/client';

import './App.css';
import Users from './Components/Users';
import Landing from './Components/Landing';

const client = new ApolloClient({
  uri: "http://localhost:4000",
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path='/landing'>
            <Landing />
          </Route>
          <Route path='/'>
            <Users />
          </Route>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
