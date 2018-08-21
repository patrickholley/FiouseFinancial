import React from 'react';
import { Animated, TouchableWithoutFeedback, View } from 'react-native';
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
  align-items: center;
  height: 40;
  padding-left: 10px;
  flex-flow: row;
  justify-content: space-between;
`;

/* eslint-disable react/prefer-stateless-function */
export default class NavigationDrawerPresentation extends React.Component {
  generateLinks = (linkAttributes) => Object.keys(linkAttributes).map(key => {
    const {
      subMenuAnim,
      subMenuItems,
      text,
    } = linkAttributes[key];

    let arrowSubMenuAnim;
    let subMenuItemsAnim;
    const subMenuItemKeys = subMenuItems ? Object.keys(subMenuItems) : [];

    if (subMenuAnim) {
      arrowSubMenuAnim = subMenuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
      });

      subMenuItemsAnim = subMenuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, Object.keys(subMenuItems).length * 30],
      });
    }

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
          {subMenuItems && <Animated.View
            style={{ transform: [{ rotate: arrowSubMenuAnim }] }}
          >
            <TouchableWithoutFeedback
              onPress={() => { this.props.onSubMenuPress(key); }}
            >
              <MCIcon
                name="chevron-right"
                size={36}
                color={colors[3]}
              />
            </TouchableWithoutFeedback>
          </Animated.View>}
        </LinkView>
        <Animated.View
          style={{
            height: subMenuItemsAnim,
            opacity: subMenuAnim,
          }}
        >
          {subMenuItemKeys.map(subKey => (
            <FButton
              key={subKey}
              buttonStyles={{
                alignItems: 'center',
                height: 30,
                justifyContent: 'flex-start',
                paddingLeft: 20,
              }}
              backgroundColor="white"
              onPress={() => { this.props.onLinkPress(key, subKey); }}
              textColor={colors[3]}
              text={subMenuItems[subKey].name}
            />
          ))}
        </Animated.View>
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
  onSubMenuPress: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavigationDrawerPresentation.defaultProps = {
  user: { email: 'null@null.com' },
};
