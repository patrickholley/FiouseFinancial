import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FTableCell from './FTableCell';

const RowView = styled.View`
  display: flex;
  flex-flow: row;
  justifyContent: space-around;
  background-color: white;
`;

export default class FTableRow extends React.PureComponent {
  render() {
    const { data, columns, columnStyles } = this.props;

    return (
      <RowView>
        {columns.map(column => (
          <FTableCell
            key={column}
            text={data[column]}
            style={columnStyles[column]}
          />
        ))}
      </RowView>
    );
  }
}

FTableRow.propTypes = {
};

FTableRow.defaultProps = {
};
