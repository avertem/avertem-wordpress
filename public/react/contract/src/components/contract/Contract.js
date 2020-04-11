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
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Label,
  Button,
  Spinner,
  CardTitle} from 'reactstrap';

import { AvertemTransaction, AvertemKey } from 'avertem-js-utils';
import { AccountContext } from '../../context/AccountContext';
import { NamespacesContext } from '../../context/NamespacesContext';
import {Typeahead} from 'react-bootstrap-typeahead';

var sha256 = require('js-sha256').sha256;
var Buffer = require('buffer/').Buffer


const FEE = 20;

class Contract extends Component {

    static contextType = AccountContext;

    constructor(props) {
        super(props);

        
        this.state = {
            modal_send: false,
            modal_confirm: true,
            modal_request: false,
            modal_complete: false,
            modal_failure: false,
            contract_info: {
                contractName: '',
                contractHash: '',
                contractNamespace: '',
                contractFee: 10,
                contractDuration: 10,
                contract: null,
                mnemonic: ''
            },
            request_info: {

            },
            complete_info: {
                transactionHash: '',
                transactionValue: 0
            },
            failure_info: {
                transactionHash: '',
                transactionValue: 0,
                error: ''
            }
        };

        this.handleContractNameChange = this.handleContractNameChange.bind(this);
        this.handleContractHashChange = this.handleContractHashChange.bind(this);
        this.handleContractNamespaceChange = this.handleContractNamespaceChange.bind(this);
        this.handleContractFeeChange = this.handleContractFeeChange.bind(this);
        this.handleContractDurationChange = this.handleContractDurationChange.bind(this);
        this.handleContractChange = this.handleContractChange.bind(this);
        this.handleMnemonicChange = this.handleMnemonicChange.bind(this);
        this.sendContract = this.sendContract.bind(this);
    }

    toggle = modalType => () => {
        console.log("Toggle the modal stuff " + modalType)
        this.setState({
            [`modal_${modalType}`]: !this.state[`modal_${modalType}`],
            modal_confirm: true,
            modal_request: false,
            modal_complete: false,
            modal_failure: false
        });
    };

    handleContractNameChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractName = event.target.value;
        let hash = sha256.create();
        hash.update(contract_info.contractName);
        let hashBuffer = new Buffer(hash.arrayBuffer())
        contract_info.contractHash = hashBuffer.toString("hex");

        this.setState({ contract_info: contract_info});
    }

    handleContractHashChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractHash = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleContractNamespaceChange(value) {
        console.log("Value [%o]",value);
        let contract_info = this.state.contract_info;
        contract_info.contractNamespace = value;
        this.setState({ contract_info: contract_info});
    }

    handleContractFeeChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractFee = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleContractDurationChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractDuration = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleContractChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contract = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleMnemonicChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.mnemonic = event.target.value
        this.setState({ contract_info: contract_info});
    }

    
    async sendContract(event) {
        console.log("Selected : [%o]",this.state.contract_info )
        event.preventDefault();

        let currentDate = new Date();

        let versionSha256 = sha256.create();
        versionSha256.update(this.state.contract_info.contractName);
        versionSha256.update(currentDate.toISOString());
        versionSha256.update("" + Math.random());
        let versionBuffer = new Buffer(versionSha256.arrayBuffer())
        let versionHash = versionBuffer.toString("hex");
        
        let contractBuffer = new Buffer(this.state.contract_info.contract);


        let transaction = new AvertemTransaction(new AvertemKey(this.state.contract_info.mnemonic),
            FEE,this.context.accountDetails.account,this.context.accountDetails.account,
            'D594F22DC389E38B3DE7FA5630DBD9DCA16DA8A77097516FD37F9E25C6BE24D2',
            {
                contract: '5C301417C4DC9480205383172A36F3B62349B2C46166D5EE2C5C030FAD41EE45',
                contractName: 'avertem__contract_management_contract',
                model:{subjects :[
                    {
                        subject: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#Contract/" + this.state.contract_info.contractHash,
                        predicates: [
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#id",
                                objects: [
                                {
                                        value: this.state.contract_info.contractHash,
                                        dataType:"http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#hash",
                                objects: [
                                    {
                                        value: this.state.contract_info.contractHash,
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#name",
                                objects: [
                                    {
                                        value: this.state.contract_info.contractName,
                                        dataType:"http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#accountHash",
                                objects: [
                                    {
                                        value: this.context.accountDetails.account,
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#namespace",
                                objects: [
                                    {
                                        value:this.state.contract_info.contractNamespace[0],
                                        dataType:"http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/AccountModifier#accountModifier",
                                objects: [
                                    {
                                            value:"PUBLIC",
                                            dataType:"http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            }]
                    },
                    {
                        subject: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#ContractVersion/" + versionHash,
                        predicates: [
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#id",
                                objects: [
                                    {
                                        value: versionHash,
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#hash",
                                objects: [
                                    {
                                        value: this.state.contract_info.contractHash,
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#contract",
                                objects: [
                                    {
                                        value: "http://keto-coin.io/schema/rdf/1.0/keto/Contract#Contract/" + this.state.contract_info.contractHash,
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#dateTime",
                                objects: [
                                    {
                                        value: currentDate.toISOString(),
                                        dataType: "http://www.w3.org/2001/XMLSchema#dateTime"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#duration",
                                objects: [
                                    {
                                        value: this.state.contract_info.contractDuration,
                                        dataType: "http://www.w3.org/2001/XMLSchema#decimal"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#fee",
                                objects: [
                                    {
                                        value: this.state.contract_info.contractFee,
                                        dataType: "http://www.w3.org/2001/XMLSchema#decimal"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#format",
                                objects: [
                                    {
                                        value: "wasm",
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            },
                            {
                                predicate: "http://keto-coin.io/schema/rdf/1.0/keto/ContractVersion#value",
                                objects: [
                                    {
                                        value: contractBuffer.toString("hex"),
                                        dataType: "http://www.w3.org/2001/XMLSchema#string"
                                    }
                                ]
                            }]
                    }
                ]}
            });
        
        let vm = this;
        this.setState({
            modal_confirm: false,
            modal_request: true,
            modal_complete: false,
            
        });
        
        fetch(`/wp-json/avertem/v1/transaction/send`, {
            method: 'POST',
            body: transaction.getProtoTransBuffer(),
            mode : 'cors',  
            headers: { 
                'Content-Type': 'application/protobuf',
                'session_hash': this.authSession,
                'Access-Control-Allow-Origin' : '*',
                'X-WP-Nonce': window._contract_wpnonce
            },
            rejectUnauthorized: false
        }).then(result=> {
            console.log("After sending the result is %o",result)
            if (result.status == 200) {
                console.log("Update the status %o",result)
                this.setState({
                    modal_confirm: false,
                    modal_request: false,
                    modal_complete: true,
                    complete_info: {
                        transactionHash: transaction.transactionHashValue.toString("hex"),
                        transactionValue: (FEE + 10000)
                    }
                });
            }
        }).catch(result=> {
            console.log("Failed to send the transaction %s", result.statusText);
        })
    }

    render() {
        return (
            <Form>
                <Card>
                    <CardBody>
                        <FormGroup>
                            <Label for="contractName">Contract Name</Label>
                            <Input 
                                type="text" 
                                name="contractName"
                                value={this.state.contract_info.contractName}
                                onChange={this.handleContractNameChange}
                                required={true}>Contract Name</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contractHash">Contract Hash</Label>
                            <Input 
                                type="text" 
                                name="contractHash"
                                value={this.state.contract_info.contractHash}
                                onChange={this.handleContractHashChange}
                                required={true}>Contract Hash</Input>
                        </FormGroup>
                        <NamespacesContext.Consumer>
                            {namespaces => {
                            let names = [];
                            console.log("The namespaces are [%o]",namespaces);
                            if (namespaces) {
                                names = namespaces.namespaces.filter(obj => {return obj.type === "rdf";}).map(obj => {
                                    return obj.namespace;});
                            }
                            console.log("The names are [%o]",names);
                            return (
                            <FormGroup>
                                <Label for="contractNamespace">Contract Namespace</Label>
                                <Typeahead
                                    type="text" 
                                    name="contractNamespace"
                                    value={this.state.contract_info.contractNamespace}
                                    onChange={this.handleContractNamespaceChange}
                                    options={names}
                                    required={true}>Contract Namespace</Typeahead>
                            </FormGroup>
                            )}}
                        </NamespacesContext.Consumer>
                        <FormGroup>
                            <Label for="contractFee">Contract Fee</Label>
                            <Input 
                                type="number" 
                                name="contractFee"
                                value={this.state.contract_info.contractFee}
                                onChange={this.handleContractFeeChange}
                                required={true}>Contract Fee</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contractDuration">Contract Execution Duration</Label>
                            <Input 
                                type="number" 
                                name="contractDuration"
                                value={this.state.contract_info.contractDuration}
                                onChange={this.handleContractDurationChange}
                                required={true}>Contract Duration</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="contract">Contract</Label>
                            <Input 
                                type="file" 
                                name="contract"
                                value={this.state.contract_info.contract}
                                onChange={this.handleContractChange}
                                required={true}>Contract</Input>
                                <FormText color="muted">
                                    The contract file that will stored.
                                </FormText>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.toggle('send')}>
                            Send
                        </Button>
                        <Modal
                            isOpen={this.state.modal_send}
                            toggle={this.toggle('send')}
                            className={this.props.className}>
                            <ModalHeader toggle={this.toggle('send')}>Confirm Send {this.state.contract_info.name}</ModalHeader>
                            { this.state.modal_confirm && 
                            <ModalBody>
                                <FormGroup>
                                    <Label for="mnemonic">Mnemonic Phrase</Label>
                                    <Input 
                                        type="textarea" 
                                        name="mnemonic"
                                        value={this.state.contract_info.mnemonic}
                                        onChange={this.handleMnemonicChange}
                                        required={true}>Mnemonic Phrase</Input>
                                        <FormText color="muted">
                                            Please provide your mnemonic phrase for confirmation.
                                        </FormText>
                                </FormGroup>    
                            </ModalBody>
                            }
                            { this.state.modal_complete && 
                            <ModalBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Transaction</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        {this.state.complete_info.transactionHash}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Amount</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        {this.state.complete_info.transactionValue}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                </ListGroup>
                            </ModalBody>
                            }
                            { this.state.modal_failure && 
                            <ModalBody>
                                <ListGroup>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Transaction</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        {this.state.failure_info.transactionHash}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Amount</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        {this.state.failure_info.transactionValue}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                    <ListGroupItem>
                                        <ListGroupItemHeading>Error</ListGroupItemHeading>
                                        <ListGroupItemText>
                                        {this.state.failure_info.transactionValue}
                                        </ListGroupItemText>
                                    </ListGroupItem>
                                </ListGroup>
                            </ModalBody>
                            }   
                            <ModalFooter>
                                { this.state.modal_confirm &&
                                <div>
                                    <Button color="primary" onClick={this.sendContract}>
                                        Send
                                    </Button>{' '}
                                    <Button color="secondary" onClick={this.toggle('send')}>
                                        Cancel
                                    </Button>
                                </div>
                                }
                                { this.state.modal_request && 
                                <div>
                                    <ModalBody>
                                        <Spinner color="dark" />
                                    </ModalBody>
                                </div>
                                }
                                { (this.state.modal_complete && this.state.modal_failure)  &&
                                <div>
                                    <Button color="secondary" onClick={this.toggle('send')}>
                                        Close
                                    </Button>
                                </div>
                                }
                            </ModalFooter>
                        </Modal>
                    </CardFooter>
                </Card>
            </Form>
            
        );
    }
}

export default Contract;
