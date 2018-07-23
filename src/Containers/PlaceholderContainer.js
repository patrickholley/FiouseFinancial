import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';

export default class HomeContainer extends React.Component {
  componentWillMount() {
    AsyncStorage.getItem('user')
      .then(userData => {
        if (userData) {
          const user = JSON.parse(userData);
          Actions.push('home');
        } else {
          Actions.push('accountAccess', { formType: 'login' });
        }
      }).catch(error => Actions.push('accountAccess', { formType: 'login' }));
  }

  render() { return <View />; }
}
