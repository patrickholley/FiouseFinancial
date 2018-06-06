import React from 'react';
import { Text, View } from 'react-native';
import NewAccountPresentation from '../Presentations/NewAccountPresentation';

import firebase from 'react-native-firebase';

export default class NewAccountContainer extends React.Component {
  render() {
    return (
      <NewAccountPresentation />
    );
  }
}
