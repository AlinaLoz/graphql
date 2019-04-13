import React from 'react';
import {Route, Switch, withRouter} from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import {connect} from "react-redux";
import Navbar from "./Sidebar";
import Profile from "./Profile";
import Team from "./TeamChange";
import ListTeams from "./ListTeams";
import ListBoards from "./ListBoards";
import Board from "./Board";
import {fetchAuth} from "../redux/auth/actions";
import {TeamCreate} from "./TeamCreate";

import gql from 'graphql-tag';
import {graphql, withApollo} from 'react-apollo';

class HomePage extends React.Component {
	intervalAuth = null;

	componentWillMount() {
		const {onfetchAuth} = this.props;
		onfetchAuth();
		this.intervalAuth = setInterval(() => onfetchAuth(), 5000);
	}

	render() {
		const {auth} = this.props;

		return (
			<React.Fragment>
				{auth && <Navbar/>}
				<Switch>
					<Route path='/register' component={Register}/>
					{!auth && <Route component={Login}/>}
					{/*<Route path={'/profile'} component={Profile} />*/}
					<Route path={'/team/change'} component={TeamCreate}/>
					<Route path={'/team/:id'} component={Team}/>
					<Route path={'/team'} component={ListTeams} />
					<Route path={'/board/change'} component={Board}/>
					<Route path={'/boards'} component={ListBoards}/>
				</Switch>
			</React.Fragment>
		)
	}
}

let query = `
  {
  	  auth {
					auth
					token
				}
  }
`;

export default withRouter(
	connect(
		state => ({
			auth: state.auth.auth
		}),
		dispatch => ({
			onfetchAuth: () => dispatch(fetchAuth(query))
		})
	)(HomePage)
);


