import React from 'react';
import ReactDOM from 'react-dom';
import TransitMap from './TransitMap';
import StopDetailsTable from './StopDetailsTable';

export default class TransitBrowse extends React.Component {
  render() {
    return (
      <div>
        <TransitMap />
        <StopDetailsTable />
      </div>
    );
  }
}
