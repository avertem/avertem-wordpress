import React, { Component } from 'react';
import { 
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
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
  Button} from 'reactstrap';

import QRCode from 'qrcode.react';

import { AccountContext } from '../../context/AccountContext';

class Account extends Component {

    static contextType = AccountContext;

    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            collapse: true
        };
    }

    toggle() {
        this.setState({ collapse: !this.state.collapse });
    }

    render() {
        return (
            <Card>
                <CardHeader>
                <div className="card-header-actions">
                    {this.context.accountDetails.account}
                    {/*eslint-disable-next-line*/}
                    <a className="card-header-action btn btn-minimize" data-target="#collapseExample" onClick={this.toggle}><i className="icon-arrow-up"></i></a>
                </div>
                </CardHeader>
                <Collapse isOpen={this.state.collapse} id="collapseExample">
                <CardBody>
                    <Row>
                    <Col xs="12" sm="6" md="4">
                        <QRCode
                        size={128}
                        bgColor={"#ffffff"}
                        fgColor={"#000000"}
                        level={"L"}
                        includeMargin={false}
                        renderAs={"svg"}
                        bgColor="white"
                        inverse={false}
                        value={this.context.accountDetails.account}
                        />
                    </Col>
                    <Col xs="12" sm="6" md="8">
                        <FormGroup>
                        <Label htmlFor="company">Balance</Label>
                        <Input type="number" id="company" value={this.context.accountDetails.total} readOnly />
                        </FormGroup>
                        <span>credit {this.context.accountDetails.credits}</span>
                        <Progress value={this.context.accountDetails.progress} />
                        <span>debit {this.context.accountDetails.debits}</span>
                    </Col>
                    </Row>
                </CardBody>
                </Collapse>
            </Card>
            
        );
    }
}

export default Account;
