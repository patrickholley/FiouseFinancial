import React from 'react';
import { Text } from 'react-native';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FTableRow from './FTableRow';

const TableList = styled.FlatList`
  width: 80%;
`;

export default class FTable extends React.PureComponent {
  render() {
    const { data, columns, columnStyles } = this.props;
    const tableData = Array.isArray(data) ? data : Object.keys(data).map(key => data[key]);

    return (
      <TableList
        data={tableData}
        renderItem={({ item }) => (
          <FTableRow
            data={item}
            columns={columns}
            columnStyles={columnStyles}
          />
        )}
      />
    );
  }
}

FTable.propTypes = {
};

FTable.defaultProps = {
};
