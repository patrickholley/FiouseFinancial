import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';
import FOverlay from './FOverlay';

const LoaderActivityIndicator = styled.ActivityIndicator`
`;

const LoaderText = styled.Text`
  color: ${colors[2]};
  fontSize: 24;
  textAlign: center;
  fontStyle: italic
`;

/* eslint-disable react/prefer-stateless-function */
export default class FLoader extends React.PureComponent {
  render() {
    return (
      <FOverlay containerStyles={this.props.containerStyles}>
        <LoaderActivityIndicator
          color={colors[0]}
          size={60}
        />
        <LoaderText>
          {this.props.text}
        </LoaderText>
      </FOverlay>
    );
  }
}

FLoader.propTypes = {
  containerStyles: PropTypes.object,
  text: PropTypes.string,
};

FLoader.defaultProps = {
  containerStyles: {},
  text: 'Loading',
};
