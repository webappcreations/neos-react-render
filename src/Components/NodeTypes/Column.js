import React from 'react';
import Transmit from 'react-transmit';
import ContentCase from 'Components/ContentCase';
import resolver from 'Helpers/resolver';
import {q} from 'Vendor/FlowQuery';

const Column = (props) => (
  <div className='Columns' style={{display: 'flex'}}>
    {props.data.map((itemProps, i) => (
      <div className='Column'>
        <ContentCase key={i} {...itemProps} />
      </div>
    ))}
  </div>
);
Column.propTypes = {
  data: React.PropTypes.array.isRequired
};

const WrappedColumn = Transmit.createContainer(Column, {
  initialVariables: {},
  fragments: {
    data({node}) {
      let nodes;
      return resolver(
        q(node).children('[instanceof TYPO3.Neos:ContentCollection]')
          .shape({
            contextPath: 'contextPath',
            nodeType: 'nodeType',
            properties: 'properties'
          }).get()
      );
    }
  }
});

export default WrappedColumn;
