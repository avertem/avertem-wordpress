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

var sha256 = require('js-sha256').sha256;
var Buffer = require('buffer/').Buffer


const FEE = 20;

class Namespace extends Component {

    static contextType = AccountContext;

    constructor(props) {
        super(props);

        
        this.state = {
            modal_send: false,
            modal_confirm: true,
            modal_request: false,
            modal_complete: false,
            modal_failure: false,
            namespace_info: {
                name: '',
                hash: '',
                type: 'contract',
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

        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleHashChange = this.handleHashChange.bind(this);
        this.handleTypeChange = this.handleTypeChange.bind(this);
        this.handleMnemonicChange = this.handleMnemonicChange.bind(this);
        this.sendNamespace = this.sendNamespace.bind(this);
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

    handleNameChange(event) {
        let namespace_info = this.state.namespace_info;
        namespace_info.name = event.target.value
        
        let hash = sha256.create();
        hash.update(namespace_info.name);
        let hashBuffer = new Buffer(hash.arrayBuffer())
        namespace_info.hash = hashBuffer.toString("hex");
        
        this.setState({ namespace_info: namespace_info});
    }

    handleHashChange(event) {
        let namespace_info = this.state.namespace_info;
        namespace_info.hash = event.target.value
        this.setState({ namespace_info: namespace_info});
    }

    handleTypeChange(event) {
        console.log("The event [%o]",event.target.value)
        let namespace_info = this.state.namespace_info;
        namespace_info.type = event.target.value
        this.setState({ namespace_info: namespace_info});
    }

    handleMnemonicChange(event) {
        let namespace_info = this.state.namespace_info;
        namespace_info.mnemonic = event.target.value
        this.setState({ namespace_info: namespace_info});
    }

    
    async sendNamespace(event) {
        console.log("Selected : [%o]",this.state.namespace_info )
        event.preventDefault();
        let transaction = new AvertemTransaction(new AvertemKey(this.state.namespace_info.mnemonic),
            FEE,this.context.accountDetails.account,this.context.accountDetails.account,
            'D594F22DC389E38B3DE7FA5630DBD9DCA16DA8A77097516FD37F9E25C6BE24D2',
            {
                contract: '9B37273E25CA8476B2B78FDC6305579BDF046547B354C8EBB1D2C29ECF02795E',
                contractName: 'avertem__namespace_management_contract',
                model:{subjects :[
                    {
                        subject: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#Namespace/' + this.state.namespace_info.hash,
                        predicates: [
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#id',
                                objects:[{
                                    value: this.state.namespace_info.hash,
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            },
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#hash',
                                objects:[{
                                    value: this.state.namespace_info.hash,
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            },
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#accountHash',
                                objects:[{
                                    value: this.context.accountDetails.account,
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            },
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#namespace',
                                objects:[{
                                    value: this.state.namespace_info.name,
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            },
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/Namespace#type',
                                objects:[{
                                    value: this.state.namespace_info.type,
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            },
                            {
                                predicate: 'http://keto-coin.io/schema/rdf/1.0/keto/AccountModifier#accountModifier',
                                objects:[{
                                    value: 'PUBLIC',
                                    dataType: 'http://www.w3.org/2001/XMLSchema#string'
                                    }
                                ]
                            }
                        ]
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
                'X-WP-Nonce': window._namespace_wpnonce
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
                            <Label for="name">Name</Label>
                            <Input 
                                type="text" 
                                name="name"
                                value={this.state.namespace_info.name}
                                onChange={this.handleNameChange}
                                required={true}>Name</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="hash">Hash</Label>
                            <Input 
                                type="text" 
                                name="hash"
                                value={this.state.namespace_info.hash}
                                onChange={this.handleHashChange}
                                required={true}>Hash</Input>
                        </FormGroup>
                        <FormGroup>
                            <Label for="type">Type</Label>
                            <Input 
                                type="select" 
                                name="type"
                                value={this.state.namespace_info.type}
                                onChange={this.handleTypeChange}
                                required={true}>Type
                                <option value={'contract'}>Contract</option>
                                <option value={'rdf'}>RDF</option>
                            </Input>
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
                            <ModalHeader toggle={this.toggle('send')}>Confirm Send {this.state.namespace_info.namespaceName}</ModalHeader>
                            { this.state.modal_confirm && 
                            <ModalBody>
                                <FormGroup>
                                    <Label for="mnemonic">Mnemonic Phrase</Label>
                                    <Input 
                                        type="textarea" 
                                        name="mnemonic"
                                        value={this.state.namespace_info.mnemonic}
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
                                    <Button color="primary" onClick={this.sendNamespace}>
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

export default Namespace;
