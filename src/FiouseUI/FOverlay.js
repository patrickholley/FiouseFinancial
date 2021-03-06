import React from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const LoaderOverlayTouchableOpacity = styled.TouchableOpacity`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  flex: 1;
  alignItems: center;
  flexDirection: column;
  justifyContent: space-around;
  backgroundColor: rgba(0, 0, 0, 0.4);
`;

const LoaderContainerView = styled.View`
  height: 160;
  width: 160;
  backgroundColor: white;
  borderRadius: 5;
  display: flex;
  padding: 10px;
  alignContent: space-between;
  justifyContent: space-between;
`;

/* eslint-disable react/prefer-stateless-function */
export default class FOverlay extends React.PureComponent {
  render() {
    return (
      <LoaderOverlayTouchableOpacity
        disabled={!this.props.enableFeedback}
        onPress={this.props.onOverlayPress}
      >
        <TouchableWithoutFeedback>
          <LoaderContainerView disabled style={this.props.containerStyles}>
            {this.props.children}
          </LoaderContainerView>
        </TouchableWithoutFeedback>
      </LoaderOverlayTouchableOpacity>
    );
  }
}

FOverlay.propTypes = {
  containerStyles: PropTypes.object,
  enableFeedback: PropTypes.bool,
  onOverlayPress: PropTypes.func,
};

FOverlay.defaultProps = {
  containerStyles: {},
  enableFeedback: false,
  onOverlayPress: () => {},
};
