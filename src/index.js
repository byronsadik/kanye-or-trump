import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {yeezyOrTrump} from './kanyeortrump.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class Game extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: 0,
      message: '',
      calloutURL: '',
      kanyeOrTrump: '',
      correctAnswer: null,

      urls: {
        kanye: 'https://api.kanye.rest?format=json',
        trump: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
      },

    };
  }

  componentDidMount() {
    this.getMessage();
  }

  getMessage() {

    // pick a URL to callout and then set the state to kanye or trump as an easier reference

    let url = ((Math.round((Math.random() * 1) + 0) === 0) ? this.state.urls.kanye : this.state.urls.trump);

    let kanyeOrTrump = (url === this.state.urls.kanye ? 'kanye' : 'trump');

    this.setState({
      calloutURL: url,
      kanyeOrTrump: kanyeOrTrump
    }, this.makeAPICall);
  }

  makeAPICall() {

    fetch(this.state.calloutURL)
      .then((res) => {return res.json()})
      .then((data) => {

        this.updateMessage(data);

      });
  }

  updateMessage(data) {
    
    let message;

    if (this.state.kanyeOrTrump === 'kanye') {
      message = data.quote;
    } else {
      message = data.message;
    }

    this.setState({
      message: message,
    });
  }

  handleClick(buttonClass) {

    // determine whether user picked correct guy and add (or subtract) from the score

    let result = (buttonClass === this.state.kanyeOrTrump);


    let newScore = result ? (this.state.score + 1) : (this.state.score - 1);

    this.setState({
      score: newScore,
      correctAnswer: result,
    }, this.getMessage);
  }

  renderButton(buttonClass) {
    return(
      <Button addClass={buttonClass} onClick={() => {this.handleClick(buttonClass)}} />
    );
  }

  render() {
    return (
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
                 <Score score={this.state.score} correctAnswer={this.state.correctAnswer} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}


class Score extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      correctAnswer: ''
    };
  }

  render() {
    return (
      <h3>Your score is: {this.props.score}</h3>
    );
  }
}


function Message(props) {
  return (
    <p className='message'>{props.text}</p>
  );
}

class Button extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classes: 'btn btn-lg selector  ' + this.props.addClass,
      selector: this.props.addClass
    };
  }

  render() {
    return (
      <button type="button" 
              className={this.state.classes}
              onClick={this.props.onClick}>
        {this.state.selector}
      </button>
    );
  }
}

class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Game />
    );
  }
}

var rootDiv = document.querySelector('#root');
ReactDOM.render(<App />, rootDiv);
