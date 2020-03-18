import React from 'react';
import {TransactionContext, TransactionDefaults} from '../context/TransactionContext';


export class TransactionSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            transactions: TransactionDefaults.transactions
        }
    }

    componentDidMount() {
      this.getTransactions();
      //this.timer = setInterval(()=> this.getTransactions(), 1000*30);
        
    }

    getTransactions() {
      fetch(`/wp-json/avertem/v1/account/transactions`,{
          method: 'GET',
          mode : 'cors',  
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._send_wpnonce
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
          <TransactionContext.Provider value={this.state}>
             {this.props.children}
          </TransactionContext.Provider>
        );
    }
}


export default TransactionSession;