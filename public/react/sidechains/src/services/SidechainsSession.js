import React from 'react';
import {SidechainsContext, SidechainsDefaults} from '../context/SidechainsContext';


export class SidechainsSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.authSession = props.authSession;
        this.state = {
            sidechains: SidechainsDefaults.sidechains
        }
    }

    componentDidMount() {
      this.getSidechains();
    }

    getSidechains() {
      fetch(`/wp-json/avertem/v1/sidechain/sidechains`,{
          method: 'GET',
          mode : 'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',                  
            'Access-Control-Allow-Origin' : '*',
            'X-WP-Nonce': window._sidechains_wpnonce
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
              this.setState({sidechains:(json.data ? json.data : [])})
            }
          }).catch(error=>{
            console.log(error);
          })
    }

    render() {

        return (
          <SidechainsContext.Provider value={this.state}>
             {this.props.children}
          </SidechainsContext.Provider>
        );
    }
}


export default SidechainsSession;