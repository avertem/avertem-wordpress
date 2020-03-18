import React from 'react';
import {ProducerContext, ProducerDefaults} from '../context/ProducerContext';


export class ProducerSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
          producers: ProducerDefaults.producers
        }
    }

    componentDidMount() {
      //this.timer = setInterval(()=> this.getProducers(), 1000);
      this.getProducers();
    }

    render() {

        return (
          <ProducerContext.Provider value={this.state}>
             {this.props.children}
          </ProducerContext.Provider>
        );
    }

    getProducers() {
      fetch(`/wp-json/avertem/v1/explorer/producers`,{
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',                  
        }
      })
        .then(result=>result.json())
        .then(items=>{
            let json = JSON.parse(items)
          console.log(json)
          this.setState({producers:(json.producers ? json.producers : [])})
        })
    }
}


export default ProducerSession;