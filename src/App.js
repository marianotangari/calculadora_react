import React from 'react';
import './App.css';

//En este array voy a guardar las números que el usuario introduce
// en el display. 

var numbers_array = [];
var operations = ["+","-","/","*"]


// A continuación, las funciones que voy a utilizar para la lógica de la 
// calculadora. 


function updateDisplay(value){
  if (this.state.value == null){
    this.setState({value})
      numbers_array.push(value)
  }
  else{
    if(!(operations.indexOf(numbers_array[numbers_array.length-1]) >-1 
    && operations.indexOf(value) >-1)){
      if (numbers_array.join('').length < 25){
        this.setState(prevState => ({value: prevState.value + value}))
        numbers_array.push(value)
      }
    }
  }
}

function clear(){
  numbers_array = [];
  this.setState(() => ({value: null}));
}

function resultado(){
    let resultado =  0;
      if (numbers_array[0] !== "/" && numbers_array[0] !== "*"
      && operations.indexOf(numbers_array[numbers_array.length-1]) == -1){
          resultado = eval(numbers_array.join(''));
          numbers_array = [resultado];
          this.setState(() => ({value: resultado}))
      }else{
        clear(); 
      }
}


//A continuación, los componentes de React. 


class Key extends React.Component{

render(){
    if (this.props.value === "Cl"){
      return(<button className="key"
      onClick={() => clear()}>{this.props.value}</button>)
    } else{
        if (this.props.value === "="){
          return (<button className="key"
          onClick={() => resultado()}>{this.props.value}</button>)
        }else{
          return(<button className="key"
          onClick={(e) => updateDisplay(this.props.value)}>{this.props.value}</button>)
        }
      }
    }
}

class Display extends React.Component{
      constructor(props){
        super(props)
          this.state={
            value: null
          }
       updateDisplay = updateDisplay.bind(this);
       clear = clear.bind(this);
       resultado = resultado.bind(this);
      }

        render(){
            return <div className="label">{this.state.value}</div>
        }
}
class Calculadora extends React.Component{
  renderKey(i){
    return <Key value={i} />
  }
  renderDisplay(){
    return <Display />
  }
  render(){

    return(
      <div className="Calculadora">
      <div className="labelRow">
          {this.renderDisplay()}
      </div>
      <div className="keyRow">
        {this.renderKey("1")}
        {this.renderKey("2")}
        {this.renderKey("3")}
        {this.renderKey("+")}
      </div>
        <div className="keyRow">
        {this.renderKey("4")}
        {this.renderKey("5")}
        {this.renderKey("6")}
        {this.renderKey("-")}
      </div>
        <div className="keyRow">
        {this.renderKey("7")}
        {this.renderKey("8")}
        {this.renderKey("9")}
        {this.renderKey("*")}
      </div>
        <div className="keyRow">
        {this.renderKey("0")}
        {this.renderKey("=")}
        {this.renderKey("Cl")}
        {this.renderKey("/")}
      </div>
      </div>
    )
    }
  }

class App extends  React.Component{
  render(){
    return (
    <div className="App"><Calculadora />
    </div>
    )
  }
}

export default App;
