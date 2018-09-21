import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FTableCell from './FTableCell';

const RowTouchableOpacity = styled.TouchableOpacity`
  display: flex;
  flex-flow: row;
  justifyContent: space-around;
  background-color: white;
`;

export default class FTableRow extends React.PureComponent {
  render() {
    const {
      data,
      disabled,
      columns,
      columnStyles,
      onPressIn,
      onPressOut,
      rowStyles,
    } = this.props;

    return (
      <RowTouchableOpacity
        disabled={disabled}
        onPressIn={() => { onPressIn(data); }}
        onPressOut={() => { onPressOut(data); }}
      >
        {columns.map(column => (
          <FTableCell
            key={column}
            text={data[column]}
            style={Object.assign({}, columnStyles[column], rowStyles)}
          />
        ))}
      </RowTouchableOpacity>
    );
  }
}

FTableRow.propTypes = {
  columnStyles: PropTypes.object,
  rowStyles: PropTypes.object,
};

FTableRow.defaultProps = {
  columnStyles: {},
  rowStyles: {},
};
