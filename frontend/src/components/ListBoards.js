import React, {Component} from 'react';
import {connect} from "react-redux";
import {Button, Grid, Header, Icon, Message, List} from "semantic-ui-react";
import {dropMessage, getBoards} from "../redux/board/actions";

class ListBoards extends Component{
    componentWillMount() {
    }

    componentDidMount() {
      const {teams} = this.props;
      if (!teams.length) {

      }
    }

    render(){
        const {boards, message, teams} = this.props;
        const {ondropMessage} = this.props;

//onClick={() => onEmitDropBoard(board.id)}
        const teamName = board => teams.length  && board.ownerIsTeam ?  `(${teams.find(t => t.id == board.teamId).name})` : '';
        return (
          <Grid>
              <Message hidden={Object.keys(message).length < 2} onDismiss={ondropMessage}>
                  <Message.Header>{message.info}</Message.Header>
              </Message>
              <Header>Доски</Header>
              <List celled className={"list-teams"}>
                  {boards.map((board, index) => <List.Item key={`item-${index}`}>
                      <List.Content>
                          <List.Header>
                            {board.name}{teamName(board)}
                          </List.Header>
                      </List.Content>
                      <List.Content className={`content-button`}>
                          <Button className={`button-drop-team`} >
                              <Icon name="close"/>
                          </Button>
                      </List.Content>
                  </List.Item>)}
                  <Button className={`button-add`} onClick={() => this.props.history.push('/board/change')}>Создать</Button>
              </List>
          </Grid>
        )
    }
}

const queries = {
  getBoards: `
     {
        getBoards {
          id
          name
        }
     }
  `,
  // dropTeam: (id) => {
  //   return `
  //     mutation DropTeam {
  //       dropTeam(id: ${id}) {
  //         message
  //         id
  //       }
  //     }
  //   `
  // }
};

export default connect(
    state => ({
        boards  : state.board.boards,
        message : state.board.message,
        teams   : state.teams.teams,
    }),
    dispatch => ({
      ongetBoard: () => dispatch(getBoards(queries.getBoards)),
      ondropMessage: () => dispatch(dropMessage())
    })
)(ListBoards);