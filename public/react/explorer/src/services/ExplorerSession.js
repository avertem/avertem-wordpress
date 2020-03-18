import React from 'react';
import {ExplorerContext, ExplorerDefaults} from '../context/ExplorerContext';


export class ExplorerSession extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            blocks: ExplorerDefaults.blocks
        }
    }

    componentDidMount() {
        //this.timer = setInterval(()=> this.getBlocks(), 1000);
        this.getBlocks();
    }

    render() {

        return (
          <ExplorerContext.Provider value={this.state}>
             {this.props.children}
          </ExplorerContext.Provider>
        );
    }

    getBlocks() {
        fetch(`/wp-json/avertem/v1/explorer/blocks`,{
            method: 'get',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',                  
            }
          })
            .then(result=>result.json())
            .then(items=> {
                console.log("The result is [%o]",items);
                let json = JSON.parse(items)
                if (json.blocks) {
                    var merge = (a, b, p) => a.filter( aa => ! b.find ( bb => aa[p] === bb[p]) ).concat(b);
                    let currentBlocks = merge(json.blocks,this.state.blocks,"hash");
                    this.setState({blocks:currentBlocks})
                }
            })
    }
}


export default ExplorerSession;