import React from 'react';
import styled from 'styled-components';

const WrapperView = styled.View`
  alignItems: center;
  display: flex;
  width: 100%;
`;

export default class FWrapper extends React.PureComponent {
  render() {
    return (
      <WrapperView>
        {this.props.children}
      </WrapperView>
    );
  }
}
