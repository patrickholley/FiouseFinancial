import React from 'react';
import { Text, View } from 'react-native';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FButton } from '../FiouseUI';
import colors from '../constants/colors';

/* eslint-disable react/prefer-stateless-function */
export default class NavigationDrawerPresentation extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>
          {'NavigationDrawer'}
        </Text>
      </View>
    );
  }
}

NavigationDrawerPresentation.propTypes = {
};

NavigationDrawerPresentation.defaultProps = {
};
