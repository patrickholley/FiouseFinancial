import React from 'react';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationDrawerPresentation from '../Presentations/NavigationDrawerPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class NavigationDrawerContainer extends React.Component {
  constructor() {
    super();

    const baseLinkAttributes = {
      budgetList: {
        text: 'Budgets',
        isSubMenuOpen: false,
        subMenuItems: {
          familyMonthly: { text: 'Family Monthly' },
          personalWeekly: { text: 'Personal Weekly' },
        },
        subMenuAnim: new Animated.Value(0),
      },
      settings: { text: 'Settings' },
      signOut: { text: 'Sign Out' },
    };

    this.state = {
      linkAttributes: baseLinkAttributes,
    };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onLinkPress = (linkKey, subKey) => {
    if (linkKey === 'signOut') {
      this.props.onLogout();
    } else if (subKey) {
      Actions.push('budget');
    } else Actions.push(linkKey);
  };

  onSubMenuPress = (linkKey) => {
    const { linkAttributes } = this.state;
    const willSubMenuOpen = !linkAttributes[linkKey].isSubMenuOpen;
    linkAttributes[linkKey].isSubMenuOpen = willSubMenuOpen;
    Animated.timing(
      this.state.linkAttributes[linkKey].subMenuAnim,
      { toValue: willSubMenuOpen, duration: 250 },
    ).start();
    this.setState({ linkAttributes });
  };

  render() {
    return (
      <NavigationDrawerPresentation
        linkAttributes={this.state.linkAttributes}
        onLinkPress={this.onLinkPress}
        onSubMenuPress={this.onSubMenuPress}
        user={this.props.user}
      />
    );
  }
}

const mapDispatchToProps = dispatch => ({
  onLogout: () => dispatch({
    type: LOGOUT_REQUEST,
  }),
});

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

NavigationDrawerContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavigationDrawerContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerContainer);
