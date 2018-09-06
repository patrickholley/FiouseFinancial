import React from 'react';
import { Actions } from 'react-native-router-flux';
import { AsyncStorage, View } from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import { RESTORE_USER, RESTORE_BUDGETS } from '../constants/actions';

class PlaceholderContainer extends React.Component {
  componentWillMount() {
    this.reroute();
  }

  reroute = async () => {
    AsyncStorage.getItem('user')
      .then(userData => {
        if (userData) {
          const user = JSON.parse(userData);
          this.props.restoreUser(user);
          AsyncStorage.getItem('budgets')
            .then(budgetsData => {
              if (budgetsData) {
                this.props.restoreBudgets(
                  fromJS(JSON.parse(budgetsData)),
                  user,
                );
              }

              Actions.replace('budgetList');
            }).catch(budgetsError => {
              console.error(budgetsError);
              Actions.replace('login');
            });
        } else {
          Actions.replace('login');
        }
      }).catch(error => {
        console.error(error);
        Actions.replace('login');
      });
  }

  render() { return <View />; }
}

const mapDispatchToProps = dispatch => ({
  restoreUser: user => dispatch({
    type: RESTORE_USER,
    payload: { user },
  }),
  restoreBudgets: (budgets, user) => dispatch({
    type: RESTORE_BUDGETS,
    payload: { budgets, user },
  }),
});

PlaceholderContainer.propTypes = {
  restoreUser: PropTypes.func.isRequired,
  restoreBudgets: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(PlaceholderContainer);
