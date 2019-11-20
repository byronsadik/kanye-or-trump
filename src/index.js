import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {yeezyOrTrump} from './kanyeortrump.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props){
    super(props);

    this.trump = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'; 
    this.kanye = 'https://api.kanye.rest?format=json';

    this.state = {
      score: 0,
      message: '',
      calloutURL: this.getCalloutURL()
    };
  }

  componentDidMount(){
    console.log("component mount: " + this.state.calloutURL);
    this.getMessage();
  }

  getCalloutURL() {
    return ((Math.round((Math.random() * 1) + 0) === 0) ? this.kanye : this.trump);
  }

  getKanyeOrTrump(){
    return (this.state.calloutURL === this.kanye ? 'kanye' : 'trump');
  }

  callBack(string){
    this.setState({
      message: string,
    });
  }

  getMessage(){

    console.log("getMessage(): " + this.state.calloutURL);

    fetch(this.state.calloutURL)
      .then((res) => {return res.json()})
      .then((data) => {

        if (this.state.calloutURL === this.kanye) {

          this.callBack(data.quote);
        
        } else if (this.state.calloutURL === this.trump) {
        
          this.callBack(data.message);

        }

      });
  }

  handleClick(c) {
    let newScore = (c === this.getKanyeOrTrump()) ? (this.state.score + 1) : (this.state.score - 1);

    this.setState({
      score: newScore,
    });

    this.getMessage();
  }

  renderButton(c){
    return(
      <Button addClass={c} onClick={() => {this.handleClick(c)}} />
    );
  }

  render(){
    return(
      <div class="container">
        <div class="row">
          <div class="col-lg-12 text-center">
            <h1 class="mt-5">Who said it? Kanye or Trump?</h1>
            <div class="container">
              <div class="row">
                <Message text={this.state.message} />
              </div>
              <div class="row">
                <div class="col-sm">
                  {this.renderButton('kanye')}                  
                </div>
                <div class="col-sm">
                  {this.renderButton('trump')}                  
                </div>
              </div>
              <div class="row">
                <div class="col-sm">
                 <Score score={this.state.score} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function Score(props) {
  return(
    <h3>The score is: {props.score}</h3>
  );
}


function Message(props) {
  return (
    <p className='message'>{props.text}</p>
  );
}

class Button extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      classes: 'btn btn-lg selector  ' + this.props.addClass,
      selector: this.props.addClass
    };
  }

  render() {
    return(
      <button type="button" 
              className={this.state.classes}
              onClick={this.props.onClick}>
        {this.state.selector}
      </button>
    );
  }
}

var rootDiv = document.querySelector('#root');
ReactDOM.render(<App />, rootDiv);
