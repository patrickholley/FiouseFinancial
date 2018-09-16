import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import colors from '../constants/colors';

const Cell = styled.Text`
  border: 2px solid ${colors[3]};
  color: ${colors[1]}
  font-size: 24px;
  text-align: center;
  padding: 8px;
`;

export default class FTableCell extends React.PureComponent {
  render() {
    const { text, style } = this.props;

    return (
      <Cell style={style}>
        {text}
      </Cell>
    );
  }
}

FTableCell.propTypes = {
};

FTableCell.defaultProps = {
};
