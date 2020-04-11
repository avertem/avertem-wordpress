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
import { NamespacesContext } from '../../context/NamespacesContext';

class Namespaces extends Component {

  static contextType = NamespacesContext;

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
        name: 'Name',
        selector: 'namespace',
        sortable: true,
        right: true,
      },
      {
        name: 'Hash',
        selector: 'hash',
        sortable: true,
        right: true,
      },
      {
        name: 'Type',
        selector: 'type',
        sortable: true,
        right: true,
      }
    ];
  }

  render() {
    return (
          <DataTable
            data={this.context.namespaces}
            columns={this.columns}
            noHeader
            fixedHeaderScrollHeight="300px"
          />
    );
  }
}

export default Namespaces;
