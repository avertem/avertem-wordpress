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
import { ContractsContext } from '../../context/ContractsContext';

class Contracts extends Component {

  static contextType = ContractsContext;

  constructor(props) {
    super(props);

    this.state = {
      /*collapse: true,
      fadeIn: true,
      transactions: [{
        id: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        account: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        date: "2019-12-11T12:17:49",
        type: "debit",
        name: "keto_account_contract",
        amount: 23
      },{
        id: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        account: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        date: "2019-12-11T12:17:49",
        type: "credit",
        name: "keto_account_contract",
        amount: 23
      },{
        id: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        account: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        date: "2019-12-11T12:17:49",
        type: "credit",
        name: "keto_account_contract",
        amount: 23
      },{
        id: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        account: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        date: "2019-12-11T12:17:49",
        type: "credit",
        name: "keto_account_contract",
        amount: 23
      },{
        id: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        account: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        date: "2019-12-11T12:17:49",
        type: "credit",
        name: "keto_account_contract",
        amount: 23
      }]*/
    };

    this.columns = [
      {
        name: 'Hash',
        selector: 'hash',
        sortable: true,
        right: true,
      },
      {
        name: 'Name',
        selector: 'name',
        sortable: true,
        right: true,
      },
      {
        name: 'Namespace',
        selector: 'namespace',
        sortable: true,
        right: true,
      }
    ];
  }

  render() {
    return (
          <DataTable
            data={this.context.transactions}
            columns={this.columns}
            noHeader
            fixedHeaderScrollHeight="300px"
          />
    );
  }
}

export default Contracts;
