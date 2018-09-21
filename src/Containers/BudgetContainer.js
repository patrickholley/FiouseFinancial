import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { fromJS } from 'immutable';
import BudgetPresentation from '../Presentations/BudgetPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetContainer extends React.Component {
  constructor() {
    super();
    const { budget } = Actions.currentParams;

    this.state = {
      budget,
      expenses: fromJS({}),
    };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onAddPress = () => {
    Actions.push('expenseEditor', { budgetId: this.state.budget.id });
  }

  render() {
    return (
      <BudgetPresentation
        budget={this.state.budget}
        expenses={this.state.expenses}
        onAddPress={this.onAddPress}
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

export default connect(mapStateToProps, mapDispatchToProps)(BudgetContainer);
