import React from 'react';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {ApolloClient, ApolloProvider, HttpLink, InMemoryCache} from '@apollo/client';
import {setContext} from 'apollo-link-context';

import './App.css';
import Users from './Components/Users';
import Landing from './Components/Landing';
import Signup from './pages/Signup';
import Login from './pages/Login';
import PrivateRoute from './Components/PrivateRoute';

const routes = createBrowserRouter([
  {
    path: "/users",
    element: (
      <PrivateRoute>
        <Users />
      </PrivateRoute>
    ),
  },
  {
    path: "landing",
    element: <Landing />,
  },
  {
    path: "signup",
    element: <Signup />,
  },
  {
    path: "login",
    element: <Login />,
  }
]);

const httpLink = new HttpLink({
  uri: "http://localhost:4000"
})

const authLink = setContext(async (req, {headers}) => {
  const token = localStorage.getItem('token');

  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any);
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})

function App() {
  return (
    <ApolloProvider client={client}>
      <RouterProvider router={routes} />
    </ApolloProvider>
  );
}

export default App;
