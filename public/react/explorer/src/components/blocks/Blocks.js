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

import { ExplorerContext } from '../../context/ExplorerContext';
import DataTable, { memoize } from 'react-data-table-component'

class Blocks extends Component {

  static contextType = ExplorerContext;

  constructor(props) {
    super(props);

    this.state = {
      collapse: true,
      fadeIn: true//,
      /*blocks: this.context.blocks[{
        hash: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        created: "2019-12-11T12:17:49",
        parent: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        accepted: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        validation: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        merkel: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        height: 2313
      },{
        hash: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        created: "2019-12-11T12:17:49",
        parent: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        accepted: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        validation: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        merkel: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        height: 2313
      },{
        hash: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        created: "2019-12-11T12:17:49",
        parent: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        accepted: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        validation: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        merkel: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        height: 2313
      },{
        hash: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        created: "2019-12-11T12:17:49",
        parent: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        accepted: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        validation: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        merkel: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        height: 2313
      },{
        hash: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        created: "2019-12-11T12:17:49",
        parent: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        accepted: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        validation: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        merkel: "6941575F0300277CE7B37372EF50D2C24A72379B0387A99D45BB206B4DD08925",
        height: 2313
      }]*/
    };

    this.columns = [
      {
        name: 'Hash',
        selector: 'hash',
        sortable: true
      },
      {
        name: 'Tangle',
        selector: 'tangle',
        sortable: true
      },
      {
        name: 'Created',
        selector: 'created',
        sortable: true,
      },
      {
        name: 'Parent',
        selector: 'parent',
        sortable: true,
      },
      {
        name: 'Accepted',
        selector: 'accepted',
        sortable: true,
      },
      {
        name: 'Validation',
        selector: 'validation',
        sortable: true,
      },
      {
        name: 'Merkel',
        selector: 'merkel',
        sortable: true,
      },
      {
        name: 'Height',
        selector: 'height',
        sortable: true,
      }
    ];
  }

  render() {
    return (
          <DataTable
            noHeader
            data={this.context.blocks}
            columns={this.columns}
            fixedHeader
          />
    );
  }
}

export default Blocks;
