import React, { Component } from 'react';
import { 
  Badge,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Col,
  Row,
  Collapse,
  Fade,
  Progress,
  Form,
  FormGroup,
  FormText,
  FormFeedback,
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButtonDropdown,
  InputGroupText,
  Label,
  Button,
  Table,
  Pagination,
  PaginationItem,
  PaginationLink} from 'reactstrap';

import DataTable, { memoize } from 'react-data-table-component'

import { ProducerContext } from '../../context/ProducerContext';

class Producer extends Component {

  static contextType = ProducerContext;

  constructor(props) {
    super(props);

    this.columns = [
      {
        name: 'Account',
        selector: 'account_hash',
        sortable: true
      },
      {
        name: 'Tangles',
        selector: 'tangles',
        sortable: true,
      }
    ];
  }

  render() {
    return (
          <DataTable
            noHeader
            data={this.context.producers}
            columns={this.columns}
            fixedHeader
          />
    );
  }
}

export default Producer;
