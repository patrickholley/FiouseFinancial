import React from 'react';
import { View } from 'react-native';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { FButton } from '../FiouseUI';
import colors from '../constants/colors';

const UserHeaderView = styled.View`
  background-color: ${colors[3]};
  height: 60;
  flex-flow: row;
  padding-left: 20px;
  align-items: center;
`;

const UserHeaderText = styled.Text`
  font-size: 20;
  font-weight: bold;
  color: white;
  padding-left: 10px;
`;

/* eslint-disable react/prefer-stateless-function */
export default class NavigationDrawerPresentation extends React.Component {
  render() {
    return (
      <View>
        <UserHeaderView>
          <MCIcon name="account-circle" size={36} color="white" />
          <UserHeaderText>
            {'test@test.com'}
          </UserHeaderText>
        </UserHeaderView>
      </View>
    );
  }
}

NavigationDrawerPresentation.propTypes = {
};

NavigationDrawerPresentation.defaultProps = {
};
