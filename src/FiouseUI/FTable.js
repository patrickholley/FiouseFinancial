import React from 'react';
import { FlatList } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FTableRow from './FTableRow';
import colors from '../constants/colors';

const TableView = styled.View`
  flex: 1;
  align-items: center;
  width: 80%;
`;

export default class FTable extends React.PureComponent {
  render() {
    const {
      data,
      columns,
      columnStyles,
      onRowPressIn,
      onRowPressOut,
    } = this.props;
    const tableData = Array.isArray(data) ? data : Object.keys(data).map(key => data[key]);
    const headers = {};
    columns.forEach(column => {
      headers[column] = column.charAt(0).toUpperCase() + column.slice(1);
    });

    return (
      <TableView>
        <FTableRow
          data={headers}
          disabled
          columns={columns}
          columnStyles={columnStyles}
          rowStyles={{
            backgroundColor: colors[5],
            fontWeight: 'bold',
          }}
        />
        <FlatList
          data={tableData}
          renderItem={({ item }) => (
            <FTableRow
              data={item}
              columns={columns}
              columnStyles={columnStyles}
              onPressIn={onRowPressIn}
              onPressOut={onRowPressOut}
            />
          )}
          style={{ width: '100%' }}
        />
      </TableView>
    );
  }
}

FTable.propTypes = {
};

FTable.defaultProps = {
};
