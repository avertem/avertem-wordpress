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
  CardTitle} from 'reactstrap';

class Contract extends Component {

    constructor(props) {
        super(props);

        
        this.state = {
            contract_info: {
                contractName: '',
                contractHash: '',
                contractNamespace: '',
                contract: null,
                mnemonic: ''
            }
        };

        this.handleContractNameChange = this.handleContractNameChange.bind(this);
        this.handleContractHashChange = this.handleContractHashChange.bind(this);
        this.handleContractNamespaceChange = this.handleContractNamespaceChange.bind(this);
        this.handleContractChange = this.handleContractChange.bind(this);
        this.handleMnemonicChange = this.handleMnemonicChange.bind(this);
    }

    handleContractNameChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractName = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleContractHashChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractHash = event.target.value
        this.setState({ contract_info: contract_info});
    }

    handleContractNamespaceChange(event) {
        let contract_info = this.state.contract_info;
        contract_info.contractNamespace = event.target.value
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
        /*event.preventDefault();
        let transaction = new Transaction(this.mnemonic,
            this.state.send_info.amount,this.context.accountDetails.hash,this.context.accountDetails.hash,
            this.state.send_info.account)
        let vm = this;
        
        fetch(`/keto_api/transaction/${this.authSession}`, {
            method: 'POST',
            body: transaction.getProtoTransBuffer(),
            headers: { 
                'Content-Type': 'application/protobuf',
                'session_hash': this.authSession},
            rejectUnauthorized: false
        }).then(result=> {
            console.log("After sending the result is %o",result)
            this.setState({
                modal_send: false,
            });
        }).catch(result=> {
            console.log("Failed to send the transaction %s", result.statusText);
        })*/
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
                        <FormGroup>
                            <Label for="contractNamespace">Contract Namespace</Label>
                            <Input 
                                type="text" 
                                name="contractNamespace"
                                value={this.state.contract_info.contractNamespace}
                                onChange={this.handleContractNamespaceChange}
                                required={true}>Contract Namespace</Input>
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
                        <FormGroup>
                            <Label for="mnemonic">Mnemonic Phrase</Label>
                            <Input 
                                type="textarea" 
                                name="mnemonic"
                                value={this.state.contract_info.mnemonic}
                                onChange={this.handleMnemonicChange}
                                required={true}>Mnemonic Phrase</Input>
                                <FormText color="muted">
                                    This is used to sign the contract and is never passed to the server
                                </FormText>
                        </FormGroup>
                    </CardBody>
                    <CardFooter>
                        <Button color="primary" onClick={this.sendContract}>
                            Send
                        </Button>
                    </CardFooter>
                </Card>
            </Form>
            
        );
    }
}

export default Contract;
