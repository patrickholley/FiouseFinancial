import React from 'react';
import { Button, TextInput, View } from 'react-native';

import firebase from 'react-native-firebase';

export default class LoginPresentation extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      // firebase things?
    };
  }

  render() {
    const styles = {
      button: {
        height: "50%",
        width: "50%",
      },
    }

    return (
      <View>
        <TextInput placeholder="Username" />
        <TextInput placeholder="Password" />
        <Button title="Need an account?" color="darkslategrey" styles={styles.button} />
        <Button title="Forgot your password?" color="darkgreen" styles={styles.button} />
      </View>
    );
  }
}
