import React from 'react';
import {SidechainErrorsContext, SidechainErrorsDefaults} from '../context/SidechainErrorsContext';


export class SidechainErrorsSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            sidechain_errors: SidechainErrorsDefaults.sidechain_errors
        }
    }

    componentDidMount() {
      this.getContracts();
    }

    getContracts() {
      fetch(`/wp-json/avertem/v1/sidechain/sidechain_errors`,{
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._sidechain_errors_wpnonce
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
              this.setState({sidechain_errors:(json.data ? json.data : [])})
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <SidechainErrorsContext.Provider value={this.state}>
             {this.props.children}
          </SidechainErrorsContext.Provider>
        );
    }
}


export default SidechainErrorsSession;