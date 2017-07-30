import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { ApolloProvider, IntrospectionFragmentMatcher } from 'react-apollo';
import ApolloClient, { createNetworkInterface } from 'apollo-client';
import registerServiceWorker from './registerServiceWorker';

const networkInterface = createNetworkInterface({ uri: 'https://api.github.com/graphql'});

const token = '3c6705cdba4c88461425782c0b6180356568884f';

const middlewareOne = {
  applyMiddleware(req, next) {
    if (!req.options.headers) {
      req.options.headers = {};  // Create the header object if needed.
    }
    req.options.headers.authorization = `Bearer ${token}`;
    next();
  }
}

networkInterface.use([middlewareOne]);

const FragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: "OBJECT",
          name: "Issue",
        }, // this is just an example, put your own INTERFACE and UNION types here!
      ],
    },
  }
})

const client = new ApolloClient({
  networkInterface: networkInterface,
  fragmentMatcher: FragmentMatcher,
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App/>
  </ApolloProvider>,
  document.getElementById('root')
);registerServiceWorker();
