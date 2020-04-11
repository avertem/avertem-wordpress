import React from 'react';
import {ContractErrorsContext, ContractErrorsDefaults} from '../context/ContractErrorsContext';


export class ContractErrorsSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            contract_errors: ContractErrorsDefaults.contract_errors
        }
    }

    componentDidMount() {
      this.getContracts();
    }

    getContracts() {
      fetch(`/wp-json/avertem/v1/contract/contract_errors`,{
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._contract_errors_wpnonce
          }
        })
          .then(result=>{
            if (result.status == 200) {
              return result.json();
            } else {
                console.log("Failed to process request [%o]",result);
            }
          })
          .then(items=>{
            if (items) {
              console.log("error [%o]",items);
              let json = JSON.parse(items)
              console.log(json)
              this.setState({contract_errors:(json.data ? json.data : [])})
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <ContractErrorsContext.Provider value={this.state}>
             {this.props.children}
          </ContractErrorsContext.Provider>
        );
    }
}


export default ContractErrorsSession;