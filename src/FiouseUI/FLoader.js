import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import colors from '../constants/colors';

const LoaderOverlayView = styled.View`
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
  alignContent: space-around;
  justifyContent: space-around;
`;

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
      <LoaderOverlayView>
        <LoaderContainerView>
          <LoaderActivityIndicator
            color={colors[0]}
            size={60}
          />
          <LoaderText>
            {this.props.text}
          </LoaderText>
        </LoaderContainerView>
      </LoaderOverlayView>
    );
  }
}

FLoader.propTypes = {
  text: PropTypes.string,
};

FLoader.defaultProps = {
  text: 'Loading',
};
