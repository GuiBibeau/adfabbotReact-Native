import React from 'react';
import { StyleSheet, Text, View, Platform} from 'react-native';
import { GiftedChat } from 'react-native-gifted-chat';
const io = require('socket.io-client')
const socket = io('https://fabserver.herokuapp.com/')

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {messages: []};
    this.onSend = this.onSend.bind(this);
  }
  componentDidMount() {

    socket.on('chat message' || 'tech not used' || 'tech unsure'|| 'budget error', text => {
      this.setState((previousState) => {
        return {
          messages: GiftedChat.append(previousState.messages, {
            _id: Math.round(Math.random() * 1000000),
            text: text,
            createdAt: new Date(),
            user: {
              _id: 2,
              name: 'Fab',
               avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSGLoWnQXKUWjKs7AxfsKlhjf57J_kb18eccLvaWfXOQ8-yNecgsTrVUY',
            },
          }),
        };
      });
  })


  }
  onSend(messages = []) {
    socket.emit('chat message', messages[0].text)
    console.log(messages[0].text)
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });
  }
  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        user={{
          _id: 1,
        }}
      />
    );
  }
}
