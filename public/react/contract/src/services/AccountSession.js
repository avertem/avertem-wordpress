import React from 'react';
import {AccountContext, AccountDefaults} from '../context/AccountContext';


export class AccountSession extends React.Component {
    
    constructor(props) {
        super(props)

        this.state = {
            accountDetails:AccountDefaults.accountDetails
        }
    }

    componentDidMount() {
      this.getAccount();
      //this.timer = setInterval(()=> this.getAccount(), 1000*60);
    }

    getAccount() {
      fetch(`/wp-json/avertem/v1/account/info`,{
          method: 'GET',
          mode : 'cors',  
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._contract_wpnonce
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
              this.setState({accountDetails:{
                account: json.account,
                debits: json.data.debits,
                credits: json.data.credits, 
                total: json.data.total,
                progress: ((parseInt(json.data.debits) / parseInt(json.data.credits)) * 100)
              }});
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <AccountContext.Provider value={this.state}>
             {this.props.children}
          </AccountContext.Provider>
        );
    }
}


export default AccountSession;