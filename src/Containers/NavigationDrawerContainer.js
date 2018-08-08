import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import NavigationDrawerPresentation from '../Presentations/NavigationDrawerPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class NavigationDrawerContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      linkAttributes: {
        manageBugets: {
          text: 'Manage Budgets',
          isSubMenuOpen: false,
          subMenuItems: {
            familyMonthly: { text: 'Family Monthly' },
            personalWeekly: { text: 'Personal Weekly' },
          },
        },
        settings: { text: 'Settings' },
        signOut: { text: 'Sign Out' },
      },
    };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  onLinkPress = (linkKey) => {
    if (linkKey === 'signOut') {
      this.props.onLogout();
    } else {
      const { linkAttributes } = this.state;
      linkAttributes[linkKey].isSubMenuOpen = !linkAttributes[linkKey].isSubMenuOpen;
      this.setState({ linkAttributes });
    }
  };

  render() {
    return (
      <NavigationDrawerPresentation
        linkAttributes={this.state.linkAttributes}
        onLinkPress={this.onLinkPress}
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
