import React, { Component } from 'react'

export default class ClsState extends Component {
    constructor(props){
        console.log("zeroth");
        super(props)
        this.state ={
            car:"Volvo",
            Mod:"007",
            Years:8,
            
        }
    }

    shouldComponentUpdate(){
        return true
    }
    static getDerivedStateFromProps(props,state){
   
            console.log("first")
        return {Mod:props.Mod}
        
    }
    componentDidMount(){
        console.log("3rd");
        
            this.setState({Mod:222})
        
    }

  render() {
    console.log("second")
    return (
        // console.log(this.props)

      <div>
        <h1>{this.state.Mod}</h1>
        {/* <button onClick={this.sub}></button> */}
      </div>
    )
  }
}

