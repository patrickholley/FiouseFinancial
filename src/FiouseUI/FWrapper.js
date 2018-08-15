import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const WrapperView = styled.View`
  align-items: center;
  justify-content: space-between;
  display: flex;
  width: 100%;
`;

export default class FWrapper extends React.PureComponent {
  render() {
    return (
      <WrapperView style={this.props.wrapperStyles}>
        {this.props.children}
      </WrapperView>
    );
  }
}

FWrapper.propTypes = {
  wrapperStyles: PropTypes.object,
};

FWrapper.defaultProps = {
  wrapperStyles: {},
};
