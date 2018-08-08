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
  padding: 5px 10px;
  flex-flow: row;
  justify-content: space-between;
`;

/* eslint-disable react/prefer-stateless-function */
export default class NavigationDrawerPresentation extends React.Component {
  generateLinks = (linkAttributes) => Object.keys(linkAttributes).map(key => {
    const {
      subMenuItems,
      isSubMenuOpen,
      text,
    } = linkAttributes[key];

    return (
      <View key={key}>
        <LinkView>
          <FButton
            backgroundColor="white"
            onPress={() => { this.props.onLinkPress(key); }}
            textColor={colors[3]}
            text={text}
            textStyles={{
              fontSize: 20,
            }}
          />
          {subMenuItems && <MCIcon
            name="chevron-right"
            size={36}
            color={colors[3]}
            style={{
              transform: [{ rotate: isSubMenuOpen ? '90deg' : '0deg' }],
            }}
          />}
        </LinkView>
        {isSubMenuOpen && Object.keys(subMenuItems).map(subKey => (
          <FButton
            key={subKey}
            buttonStyles={{ justifyContent: 'flex-start', paddingLeft: 20 }}
            backgroundColor="white"
            onPress={this.props.onLogout}
            textColor={colors[3]}
            text={subMenuItems[subKey].text}
          />
        ))}
      </View>
    );
  });

  render() {
    return (
      <View style={{ flex: 1 }}>
        <UserHeaderView>
          <MCIcon
            name="account-circle"
            size={36}
            color="white"
          />
          <UserHeaderText>
            {this.props.user ? this.props.user.email : 'null@null.com' }
          </UserHeaderText>
        </UserHeaderView>
        {this.generateLinks(this.props.linkAttributes)}
      </View>
    );
  }
}

NavigationDrawerPresentation.propTypes = {
  linkAttributes: PropTypes.object.isRequired,
  onLinkPress: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavigationDrawerPresentation.defaultProps = {
  user: { email: 'null@null.com' },
};
