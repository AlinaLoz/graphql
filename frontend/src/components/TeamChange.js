import React, {Component} from 'react';
import {connect} from "react-redux";
import {dropMessage, getOneTeam, updateName} from "../redux/teams/actions";
import {Button, Grid, Header, Input, List, Message} from "semantic-ui-react";

class TeamChange extends Component {
    state = {
        name: ""
    };

    componentWillMount() {
        const {ongetOneTeam, match} = this.props;
        ongetOneTeam(match.params.id);
    }

    render() {
        const {ondropMessage, onupdateName} = this.props;
        const {message, team, match} = this.props;

        return (
            <Grid className={`team-change`}>
                <Message hidden={!Object.keys(message).length} onDismiss={ondropMessage}>
                    <Message.Header>{message.info}</Message.Header>
                </Message>
                <Header>{team && team.name}</Header>
                <label>изменить название тимы</label>
                <Input  onChange={(e) => this.setState({name:e.target.value})}/>
                <Header>Участники:</Header>
                <List>
                    {team && team.users.map((user, index) => <List.Item key={index}>{user.login}</List.Item>)}
                </List>
                <Button className={`button-save`} onClick={() => onupdateName(match.params.id, this.state.name)}>Сохранить</Button>
            </Grid>
        )
    }
}

const queries = {
  getOneTeam: (id) => `
    {
      getOneTeam(id: ${id}) {
        name,
        id,
        users {
          id,
          login
        }
      }
    }
  `,
  updateNameTeam: (id, name) => {
    return `
      mutation updateNameTeam {
        updateNameTeam(id: ${id}, name: "${name}")
      }
    `
  }
};

export default connect(
    (state, props) => ({
        team     : state.teams.infoTeams[props.match.params.id],
        message  : state.teams.messageOfCreate,
    }),
    dispatch => ({
        ongetOneTeam: (id) => dispatch(getOneTeam(queries.getOneTeam(id))),
        ondropMessage: () => dispatch(dropMessage()),
        onupdateName: (id, name) => dispatch(updateName(queries.updateNameTeam(id, name))),
    })
)(TeamChange);