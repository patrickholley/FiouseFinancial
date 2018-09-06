import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import BudgetListPresentation from '../Presentations/BudgetListPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetListContainer extends React.Component {
  constructor() {
    super();

    this.state = { isEditorOpen: false };
  }

  componentWillUpdate = (newProps) => {
    if (newProps.user === null) {
      Actions.replace('login');
    }
  };

  toggleEditor = () => {
    const { isEditorOpen } = this.state;
    this.setState({ isEditorOpen: !isEditorOpen });
  }

  render() {
    return (
      <BudgetListPresentation
        budgets={this.props.budgets}
        isEditorOpen={this.state.isEditorOpen}
        toggleEditor={this.toggleEditor}
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
