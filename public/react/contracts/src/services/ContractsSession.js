import React from 'react';
import {ContractsContext, ContractsDefaults} from '../context/ContractsContext';


export class ContractsSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            contracts: ContractsDefaults.contracts
        }
    }

    componentDidMount() {
      this.getContracts();
    }

    getContracts() {
      fetch(`/wp-json/avertem/v1/contract/contracts`,{
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._contracts_wpnonce
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
              this.setState({transactions:(json.data ? json.data : [])})
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <ContractsContext.Provider value={this.state}>
             {this.props.children}
          </ContractsContext.Provider>
        );
    }
}


export default ContractsSession;