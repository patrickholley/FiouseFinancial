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
  font-size: 16;
  font-weight: bold;
  color: white;
  padding-left: 10px;
`;

const LinkView = styled.View`
  padding: 10px 10px 0px 10px;
`;

/* eslint-disable react/prefer-stateless-function */
export default class NavigationDrawerPresentation extends React.Component {
  generateLinks = (linkOptions) => linkOptions.map(link => (
    <View key={link.key}>
      <LinkView>
        <FButton
          backgroundColor="white"
          buttonStyles={{
            width: '100%',
            justifyContent: 'space-between',
          }}
          onPress={() => {}}
          textColor={colors[3]}
          text={link.text}
          textStyles={{
            fontSize: 20,
          }}
        >
          {link.subMenu && <MCIcon
            name="chevron-right"
            size={36}
            color={colors[3]}
          />}
        </FButton>
      </LinkView>
      {link.subMenu && link.subMenu.map(subItem => (
        <FButton
          key={subItem.key}
          buttonStyles={{ justifyContent: 'flex-start', paddingLeft: 20 }}
          backgroundColor="white"
          onPress={() => {}}
          textColor={colors[3]}
          text={subItem.value}
        />
      ))}
    </View>
  ));

  render() {
    const linkTexts = [
      {
        key: 'manageBudgets',
        text: 'Manage Budgets',
        subMenu: [
          { key: 'familyMonthly', value: 'Family Monthly' },
          { key: 'personalWeekly', value: 'Personal Weekly' },
        ],
      },
      {
        key: 'settings',
        text: 'Settings',
      },
      {
        key: 'signOut',
        text: 'Sign Out',
      },
    ];

    return (
      <View style={{ flex: 1 }}>
        <UserHeaderView>
          <MCIcon
            name="account-circle"
            size={36}
            color="white"
          />
          <UserHeaderText>
            {'test@test.com'}
          </UserHeaderText>
        </UserHeaderView>
        {this.generateLinks(linkTexts)}
      </View>
    );
  }
}

NavigationDrawerPresentation.propTypes = {
};

NavigationDrawerPresentation.defaultProps = {
};
