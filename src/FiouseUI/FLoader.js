import React from 'react';
// import PropTypes from 'prop-types';
import {
  ActivityIndicator,
  View,
} from 'react-native';

/* eslint-disable react/prefer-stateless-function */
export default class FLoader extends React.PureComponent {
  render() {
    return (
      <View
        style={{
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          flex: 1,
          alignItems: 'center',
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: '#00000040',
        }}
      >
        <View
          style={{
            height: 100,
            width: 100,
            backgroundColor: 'white',
            borderRadius: 25,
          }}
        >
          <ActivityIndicator />
        </View>
      </View>
    );
  }
}

/* FLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  isTransparent: PropTypes.bool,
};

FLoader.defaultProps = {
  isTransparent: true,
}; */
