import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

const ButtonTouchableOpacity = styled.TouchableOpacity`
  backgroundColor: ${props => props.backgroundColor};
  height: 36;
  borderRadius: 3;
  display: flex;
  justifyContent: center;
  alignItems: center;
`;

const ButtonText = styled.Text`
  color: ${props => props.color};
  fontSize: 14;
  fontWeight: bold,
`;

export default class FButton extends React.PureComponent {
  render() {
    return (
      <ButtonTouchableOpacity
        disabled={this.props.isDisabled}
        backgroundColor={this.props.backgroundColor}
        onPress={this.props.onPress}
        style={this.props.buttonStyles}
      >
        <ButtonText
          color={this.props.textColor}
          style={this.props.textStyles}
        >
          {this.props.text.toUpperCase()}
        </ButtonText>
      </ButtonTouchableOpacity>
    );
  }
}

FButton.propTypes = {
  isDisabled: PropTypes.bool,
  onPress: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string.isRequired,
  buttonStyles: PropTypes.object,
  textColor: PropTypes.string.isRequired,
  textStyles: PropTypes.object,
  text: PropTypes.string.isRequired,
};

FButton.defaultProps = {
  buttonStyles: {},
  isDisabled: false,
  textStyles: {},
};
