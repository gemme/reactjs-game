import React, { Component } from 'react';
import './Game.css';
var _ = require('lodash');


const Stars = (props) => {	
  /*let star = [];
  for(let i =0 ; i < numberOfStars ; i++){
      star.push(<i key={i} className="fa fa-star"></i>);
  }*/
	return (
  	<div className="col-5">        
    {_.range(props.numberOfStars).map(i=><i key={i} className="fa fa-star"></i>)}
    </div>
  );
};

const Button = (props) => {

	let button;
	switch(props.answerIsCorrect){
  	case true:
    button = 
    	<button           
          className = "btn btn-success" 
          onClick = { props.acceptAnswer } >
        <i className="fa fa-check"></i>
      </button>;
    break;
    case false:
    button = 
    	<button className = "btn btn-danger" >
        <i className="fa fa-times"></i>
      </button>;
    break;
    default:
    button = 
      <button 
        onClick = { props.checkAnswer }
        className = "btn" disabled={props.selectedNumbers.length === 0}>
        =
      </button>;
    break;
  }

	return (
  	<div className="col-2 text-center">
    {button}
    <br/> <br/>
    <button className="btn btn-warning btn-sm" onClick={props.redraw}>
      <i className="fa fa-refresh"></i>
    </button>
    </div>
  );
};

const Answer = (props) => {
	return (
  	<div className= "col-5">
      {
      	props.selectedNumbers.map((number,i)=> <span onClick = { ()=>props.unselectNumber(number)} key={i}>{number}</span>)
      }
    </div>
  );
};

const Numbers = (props) => {
	
  const numberClassName = (number) => {
  	if(props.usedNumbers.indexOf(number) >= 0){
    	return 'used';
    }
  	if(props.selectedNumbers.indexOf(number) >= 0){
    	return 'selected';
    }
  };  
	return (
  	<div className="card text-center">
      <div>
        { Numbers.list.map((number, i) =>
        <span 
              onClick = { ()=>props.selectNumber(number) } 
              key={i} className={numberClassName(number)}>{number}
        </span> ) }
      </div>
    </div>
  );
};

Numbers.list = _.range(1,10);
 
class Game extends Component {
	state = {
		selectedNumbers : [],
    numberOfStars: 1 + Math.floor(Math.random()*9),
    answerIsCorrect: null,
    usedNumbers: []
	}
  
  selectNumber = (number) => {
  	if(this.state.selectedNumbers.indexOf(number) >= 0) return;
    this.setState(prevState => ({
    	 answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.concat(number)
    }));
  };
  
  unselectNumber = (number) => {
  	this.setState((prevState)=> ({
     	answerIsCorrect: null,
    	selectedNumbers: prevState.selectedNumbers.filter(selected=>selected!==number)
    }));
  };
  
  checkAnswer = () => {
  		this.setState(prevState => ({
      	answerIsCorrect: prevState.numberOfStars === prevState.selectedNumbers.reduce((a,b)=>a+b,0)
      }));
  };
  
  acceptAnswer = () => {
  		//console.log('acceptAnswer');
  		this.setState(prevState=>({
      	usedNumbers: prevState.usedNumbers.concat(prevState.selectedNumbers),
        selectedNumbers: [],
        answerIsCorrect: null,
        numberOfStars: 1 + Math.floor(Math.random()*9)
      }));
  };
  redraw = () => {
  	this.setState((prevState)=>({
    		numberOfStars:  1 + Math.floor(Math.random()*9),
        answerIsCorrect: null, 
        selectedNumbers: []
    }));
  };  
  
	render() {
  	const { numberOfStars, selectedNumbers,answerIsCorrect, usedNumbers } = this.state;
  	return (
    	<div className="container">
        <h3>Play for nine</h3>
        <div className="row">
          <Stars numberOfStars = { numberOfStars }/>
          <Button 
            selectedNumbers = {selectedNumbers} 
            answerIsCorrect = { answerIsCorrect}
            checkAnswer = { this.checkAnswer }
            acceptAnswer = { this.acceptAnswer }
            redraw = {this.redraw}
          />
          <Answer 
            unselectNumber = { this.unselectNumber } 
            selectedNumbers = {selectedNumbers} />
        </div>
        <br />
        <Numbers 
            selectNumber = { this.selectNumber }  
            selectedNumbers = {selectedNumbers}
            usedNumbers = { usedNumbers }/>
      </div>	
    );
  }
};

export default Game;
/*
class App extends React.Component {
	render(){
  	return(
    	<div>
        <Game />
      </div>
    );
  };
}

ReactDOM.render(<App />,mountNode);
*/