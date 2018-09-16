import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';

export default class FTableCell extends React.PureComponent {
  render() {
    const { text } = this.props;

    return (
      <Text>
        {text}
      </Text>
    );
  }
}

FTableCell.propTypes = {
};

FTableCell.defaultProps = {
};
