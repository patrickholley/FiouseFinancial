import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import FTableCell from './FTableCell';

const RowView = styled.View``;

export default class FTableRow extends React.PureComponent {
  render() {
    const { data, displayFields } = this.props;
    console.log(data, displayFields);

    return (
      <RowView>
        {displayFields.map(field => <FTableCell key={field} text={data[field]} />)}
      </RowView>
    );
  }
}

FTableRow.propTypes = {
};

FTableRow.defaultProps = {
};
