import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BudgetListPresentation from '../Presentations/BudgetListPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetListContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      rowPressTimer: null,
    };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  onRowPressIn = budget => {
    /* this.setState({
      rowPressTimer: setTimeout(() => { console.log('hello'); }, 1000),
    }); */
  }

  onRowPressOut = budget => {
    // clearTimeout(this.state.rowPressTimer);
    Actions.budget({ title: budget.name, budget });
  }

  render() {
    return (
      <BudgetListPresentation
        budgets={this.props.budgets}
        isEditorOpen={this.state.isEditorOpen}
        onRowPressIn={this.onRowPressIn}
        onRowPressOut={this.onRowPressOut}
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
  return { budgets, user };
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetListContainer);
