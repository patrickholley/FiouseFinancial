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
  generateSubLinks = (subMenuItems, key) => subMenuItems
    .map((subItem, subKey) => (
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
        // eslint-disable-next-line no-restricted-globals
        textColor={isNaN(subItem.get('index')) ? colors[0] : colors[3]}
        text={subItem.get('name')}
      />
    )).toArray()

  generateLinks = (linkAttributes) => linkAttributes.keySeq().toArray().map(key => {
    const link = linkAttributes.get(key);
    const subMenuAnim = link.get('subMenuAnim');
    const subMenuItems = link.get('subMenuItems');
    const text = link.get('text');

    let arrowSubMenuAnim;
    let subMenuItemsAnim;

    if (subMenuAnim) {
      arrowSubMenuAnim = subMenuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: ['0deg', '90deg'],
      });

      subMenuItemsAnim = subMenuAnim.interpolate({
        inputRange: [0, 1],
        outputRange: [0, subMenuItems.keySeq().toArray().length * 30],
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
        {subMenuItems && <Animated.View
          style={{
            height: subMenuItemsAnim,
            opacity: subMenuAnim,
          }}
        >
          {this.generateSubLinks(subMenuItems, key)}
        </Animated.View>}
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
            {this.props.user ? this.props.user.get('email') : 'null@null.com' }
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
