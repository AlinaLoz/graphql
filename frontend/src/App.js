import React, { Component } from 'react';
import {createStore, applyMiddleware } from 'redux';
import {Provider} from 'react-redux';
import { BrowserRouter as Router} from "react-router-dom";
import reducer from "./redux/reducer";
import thunk from "redux-thunk";
import HomePage from "./components/HomePage";

// import { ApolloProvider } from 'react-apollo';
// import { ApolloClient } from 'apollo-client';
// import { HttpLink } from 'apollo-link-http';
// import { InMemoryCache } from 'apollo-cache-inmemory';
// import Profile from "./components/Profile";

const store = createStore(reducer, {}, applyMiddleware(thunk));
// const cache = new InMemoryCache();

// const BASE_URL = 'http://localhost:4000/graphql';
// const httpLink = new HttpLink({
// 	uri: BASE_URL,
// });

// headers: {
// 	authorization: `Bearer ${
// 		process.env.REACT_APP_GITHUB_PERSONAL_ACCESS_TOKEN
// 		}`,
// },

// const client = new ApolloClient({
// 	link: httpLink,
// 	cache,
// });

class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<Router>
					<HomePage/>
				</Router>
			</Provider>
		);
	}
}

export default App;