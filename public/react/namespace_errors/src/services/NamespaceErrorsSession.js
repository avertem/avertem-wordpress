import React from 'react';
import {NamespaceErrorsContext, NamespaceErrorsDefaults} from '../context/NamespaceErrorsContext';


export class NamespaceErrorsSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            namespace_errors: NamespaceErrorsDefaults.namespace_errors
        }
    }

    componentDidMount() {
      this.getNamespaces();
      //this.timer = setInterval(()=> this.getTransactions(), 1000*30);
        
    }

    getNamespaces() {
      fetch(`/wp-json/avertem/v1/namespace/namespace_errors`,{
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._namespace_errors_wpnonce
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
              this.setState({namespaces:(json.data ? json.data : [])})
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <NamespaceErrorsContext.Provider value={this.state}>
             {this.props.children}
          </NamespaceErrorsContext.Provider>
        );
    }
}


export default NamespaceErrorsSession;