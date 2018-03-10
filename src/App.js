import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(props){
    super(props)
    const MyContract=window.web3.eth.contract ([
      {
        "constant": true,
        "inputs": [
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "ownerOf",
        "outputs": [
          {
            "name": "",
            "type": "address"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          },
          {
            "name": "_index",
            "type": "uint256"
          }
        ],
        "name": "tokenOfOwnerByIndex",
        "outputs": [
          {
            "name": "tokenId",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "tokenMetadata",
        "outputs": [
          {
            "name": "infoUrl",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [
          {
            "name": "_owner",
            "type": "address"
          }
        ],
        "name": "balanceOf",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "symbol",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "totalSupply",
        "outputs": [
          {
            "name": "",
            "type": "uint256"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "constant": true,
        "inputs": [],
        "name": "name",
        "outputs": [
          {
            "name": "",
            "type": "string"
          }
        ],
        "payable": false,
        "stateMutability": "view",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_owner",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_approved",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "Approval",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "transfer",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "anonymous": false,
        "inputs": [
          {
            "indexed": true,
            "name": "_from",
            "type": "address"
          },
          {
            "indexed": true,
            "name": "_to",
            "type": "address"
          },
          {
            "indexed": false,
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "Transfer",
        "type": "event"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_to",
            "type": "address"
          },
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "approve",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [
          {
            "name": "_tokenId",
            "type": "uint256"
          }
        ],
        "name": "takeOwnership",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "constant": false,
        "inputs": [],
        "name": "bundle",
        "outputs": [],
        "payable": false,
        "stateMutability": "nonpayable",
        "type": "function"
      }
    ])
    this.state={
      ContractInstance:MyContract.at('0x80b5d0b38f7a9408487aee75035755f7a1521421'),
      location:'',
      size:''
    }
    this.supplyCeo=this.supplyCeo.bind(this)
    this.showtokens=this.showtokens.bind(this)
    this.handleContractStateSubmit=this.handleContractStateSubmit.bind(this)
  }

  supplyCeo(){
    const {bundle}=this.state.ContractInstance

    bundle ((err,val)=>{
      if(err) console.log("Whoops!!",err)
      console.log(`Ceo supplied`,val)
    })
  }

  showtokens(){
    const {balanceOf}=this.state.ContractInstance

    balanceOf(0x7f75d57A0B113aA4B54294041BcfC7aD259950E0,(err,state)=>{
      if(err)console.log('whoops:::',err)
      console.log(`This is our contract's state`,state)
    })
  }

  handleContractStateSubmit(e){
      e.preventDefault ()
      const { createRandomLand }=this.state.ContractInstance
      const { location:loc }=this.state
      const { size:sz }=this.state

      createRandomLand(
        loc,
        sz,
        {
          gas:300000,
          from:window.web3.eth.accounts[0],
          value:window.web3.toWei (0.01,'ether')
        },(err,result)=>{
          console.log('new lands generated')
        }
      )
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">React & Ethereum Simple Application</h1>
        </header>
        <br/>
        <br/>
        <br/>
        <button onClick={this.supplyCeo}>supply ceo</button>
        <br/>
        <br/>
        <br/>
        <button onClick={this.showtokens}>show ceo tokens</button>
        <br/>
        <br/>
        <br/>
        <form onSubmit={this.handleContractStateSubmit}>
          <input
           type="text"
           name="location"
           placeholder="please enter location"
           value={ this.state.location}
           onChange={e=>this.setState({location:e.target.value})}
          />
          <input
           type="number"
           name="size"
           placeholder="please enter size"
           value={ this.state.size}
           onChange={e=>this.setState({size:e.target.value})}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    );
  }
}

export default App;
