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
  Button,
  CardTitle,
  Spinner,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText} from 'reactstrap';

import {Typeahead} from 'react-bootstrap-typeahead';

import { AvertemTransaction, AvertemKey } from 'avertem-js-utils';
import { AccountContext } from '../../context/AccountContext';
import { TransactionContext } from '../../context/TransactionContext';

class Account extends Component {

    static contextType = AccountContext;

    constructor(props) {
        super(props);

        
        this.state = {
            balance: 0,
            modal_send: false,
            modal_confirm: true,
            modal_request: false,
            modal_complete: false,
            modal_failure: false,
            send_info: {
                amount: 0,
                mnemonic: '',
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
            },
            selected: []
        };

        this.handleSendAmountChange = this.handleSendAmountChange.bind(this);
        this.handleMnemonicChange = this.handleMnemonicChange.bind(this);
        this.sendTokens = this.sendTokens.bind(this);
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

    handleSendAmountChange(event) {
        let send_info = this.state.send_info;
        send_info.amount = event.target.value
        this.setState({ send_info: send_info});
    }

    handleMnemonicChange(event) {
        let send_info = this.state.send_info;
        send_info.mnemonic = event.target.value
        this.setState({ send_info: send_info});
    }

    async sendTokens(event) {
        console.log("Selected : [%o]",this.state.selected )
        event.preventDefault();
        let transaction = new AvertemTransaction(new AvertemKey(this.state.send_info.mnemonic),
            this.state.send_info.amount,this.context.accountDetails.account,this.context.accountDetails.account,
            this.state.selected[0])
        let vm = this;
        this.setState({
            modal_confirm: false,
            modal_request: true,
            modal_complete: false
        });
        
        fetch(`/wp-json/avertem/v1/transaction/send`, {
            method: 'POST',
            body: transaction.getProtoTransBuffer(),
            mode : 'cors',  
            headers: { 
                'Content-Type': 'application/protobuf',
                'session_hash': this.authSession,
                'Access-Control-Allow-Origin' : '*',
                'X-WP-Nonce': window._send_wpnonce
            },
            rejectUnauthorized: false
        }).then(result=> {
            console.log("After sending the result is %o",result)
            if (result.status == 200) {
                this.setState({
                    modal_confirm: false,
                    modal_request: false,
                    modal_complete: true,
                    complete_info: {
                        transactionHash: transaction.transactionHashValue.toString("hex"),
                        transactionValue: this.state.send_info.amount
                    }
                });
            }
        }).catch(result=> {
            console.log("Failed to send the transaction %s", result.statusText);
        })
      }
    
    
    
    render() {
        const { selected } = this.state;

        return (
            <Form>
                <Card>
                    <CardBody>
                        <TransactionContext.Consumer>
                            { (transactions) => {
                                let transactionList = [];
                                console.log("The retrieve transactions [%o]",transactions);
                                if (transactions.transactions.length) {
                                    transactionList = transactions.transactions.map( (transaction) => {return transaction.account} );
                                }
                                console.log("Transaction list [%o]",transactionList);
                                return (
                                    <FormGroup>
                        
                                        <Label for="sendAccountNumber">Target Account Number</Label>
                                        <Typeahead
                                            allowNew
                                            id="sendAccountNumber"
                                            newSelectionPrefix="Enter new account : "
                                            options={ transactionList }
                                            placeholder="Account Number"
                                            onChange={(s) => this.setState({ selected: s })}
                                        />
                                    </FormGroup>
                        
                                )}
                            } 
                        </TransactionContext.Consumer>                          
                        <FormGroup>
                            <Label for="sendAmount">Number({ this.context.accountDetails.total })</Label>
                            <InputGroup>
                            <InputGroupAddon addonType="prepend">AVT</InputGroupAddon>
                            <Input
                                type="number"
                                name="sendAmount"
                                id="sendAmount"
                                placeholder="0"
                                required={true}
                                onChange={this.handleSendAmountChange}
                                value={this.state.send_info.amount}
                            />
                            </InputGroup>
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
                            <ModalHeader toggle={this.toggle('send')}>Confirm Send {this.state.send_info.value}</ModalHeader>
                            { this.state.modal_confirm && 
                            <ModalBody>
                                <FormGroup>
                                    <Label for="mnemonic">Mnemonic Phrase</Label>
                                    <Input 
                                        type="textarea" 
                                        name="mnemonic"
                                        value={this.state.send_info.mnemonic}
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
                                    <Button color="primary" onClick={this.sendTokens}>
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

export default Account;
