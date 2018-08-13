import React from 'react';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BudgetEditorPresentation from '../Presentations/BudgetEditorPresentation';
import { LOGOUT_REQUEST } from '../constants/actions';

class BudgetEditorContainer extends React.Component {
  lengthTypes = [
    { Name: 'Weekly', Id: 1 },
    { Name: 'Biweekly', Id: 2 },
    { Name: 'Semimonthly', Id: 3 },
    { Name: 'Monthly', Id: 4 },
    { Name: 'Quarterly', Id: 5 },
    { Name: 'Semiannually', Id: 6 },
    { Name: 'Annually', Id: 7 },
  ];

  constructor() {
    super();

    this.state = {
      selectedLengthType: 0,
    };
  }

  componentWillUpdate = newProps => {
    if (newProps.user === null) {
      Actions.push('login', { formType: 'login' });
    }
  };

  onValueChange = newLengthType => {
    this.setState({ selectedLengthType: newLengthType });
  };

  render() {
    return (
      <BudgetEditorPresentation
        selectedLengthType={this.state.selectedLengthType}
        lengthTypes={this.lengthTypes}
        onValueChange={this.onValueChange}
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

BudgetEditorContainer.propTypes = {
  onLogout: PropTypes.func.isRequired,
  user: PropTypes.object,
};

BudgetEditorContainer.defaultProps = {
  user: null,
};

export default connect(mapStateToProps, mapDispatchToProps)(BudgetEditorContainer);
