import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import {client} from 'settings/ApolloClient';
import App from 'containers/App';
import 'antd/dist/antd.css';
import 'antd.css';
import 'index.css';

ReactDOM.render(
  <BrowserRouter>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);
