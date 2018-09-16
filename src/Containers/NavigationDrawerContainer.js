import React from 'react';
import { Animated } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import NavigationDrawerPresentation from '../Presentations/NavigationDrawerPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

const budgetListOptions = fromJS({
  addBudget: {
    index: 0,
    name: '+ Add a Budget',
  },
});

class NavigationDrawerContainer extends React.Component {
  constructor(props) {
    super(props);

    const baseLinkAttributes = fromJS({
      budgetList: {
        text: 'Budgets',
        isSubMenuOpen: false,
        subMenuItems: this.sortSubMenuItems(props.budgets.concat(budgetListOptions)),
        subMenuAnim: new Animated.Value(0),
      },
      settings: { text: 'Settings' },
      signOut: { text: 'Sign Out' },
    });

    this.state = {
      linkAttributes: baseLinkAttributes,
    };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.budgets !== this.props.budgets) {
      this.setState(oldState => ({
        linkAttributes: oldState.linkAttributes
          .setIn(
            ['budgetList', 'subMenuItems'],
            this.sortSubMenuItems(newProps.budgets.concat(budgetListOptions)),
          ),
      }));
    }

    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onLinkPress = (linkKey, subKey) => {
    if (linkKey === 'signOut') {
      this.props.onLogout();
    } else if (subKey) {
      Actions.push(subKey === 'addBudget' ? 'budgetEditor' : 'budget');
    } else Actions.push(linkKey);
  };

  onSubMenuPress = (linkKey) => {
    let { linkAttributes } = this.state;
    const willSubMenuOpen = !linkAttributes.getIn([linkKey, 'isSubMenuOpen']);
    linkAttributes = linkAttributes.setIn([linkKey, 'isSubMenuOpen'], willSubMenuOpen);
    Animated.timing(
      this.state.linkAttributes.getIn([linkKey, 'subMenuAnim']),
      { toValue: willSubMenuOpen, duration: 250 },
    ).start();
    this.setState({ linkAttributes });
  };

  sortSubMenuItems = (subMenuItems) => subMenuItems.sort((a, b) => {
    const subAIndex = a.get('index');
    const subBIndex = b.get('index');

    if (subAIndex) return subBIndex ? subAIndex < subBIndex : 1;

    return subBIndex ? -1 : a.get('name') < b.get('name');
  });

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
  const user = state.auth.get('user');
  const budgets = state.budget.get('budgets');
  return { user, budgets };
};

NavigationDrawerContainer.propTypes = {
  budgets: PropTypes.object.isRequired,
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

NavigationDrawerContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationDrawerContainer);
