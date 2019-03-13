import React from 'react';
import ReactDOM from 'react-dom';
import {Router as BrowserRouter} from 'react-router-dom';
import {ApolloProvider} from 'react-apollo';
import {browserHistory} from 'instances/History';
import {client} from 'instances/ApolloClient';
import {alert} from 'instances/Alert';
import App from 'containers/App';
import 'antd/dist/antd.css';
import 'antd.css';
import 'index.css';

ReactDOM.render(
  <BrowserRouter history={browserHistory}>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </BrowserRouter>,
  document.getElementById('root'),
);

alert.setting();
