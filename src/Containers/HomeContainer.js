import React from 'react';
import HomePresentation from '../Presentations/HomePresentation';
import { connect } from 'react-redux';

class HomeContainer extends React.Component {
  render() {
    return (
      <HomePresentation
        user={this.props.user}
      />
    );
  }
}

const mapStateToProps = state => {
  const { user } = state.auth;
  return { user };
};

export default connect(mapStateToProps)(HomeContainer);