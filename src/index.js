import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {yeezyOrTrump} from './kanyeortrump.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      score: 0,
      kanyeOrTrump: null
    };
  }


  handleClick() {
    let score = this.state.score + 1;

    this.setState({
      score: score,
    });

    console.log("handleClick clicked");

  }

  renderButton(c){
    return(
      <Button addClass={c} onClick={() => {this.handleClick()}} />
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
                <Message />
              </div>
              <div class="row">
                <div class="col-sm">
                  <Button addClass='kanye' onClick={() => {this.handleClick()}} />
                </div>
                <div class="col-sm">
                  {this.renderButton('trump')}
                  {/*<Button addClass='trump' onClick={() => {this.handleClick()}} />*/}
                  
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

class Score extends React.Component {

  render() {
    return(
      <h3>The score is: {this.props.score}</h3>
    );
  }
}


class Message extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      message: "default"
    };
  }

  render() {
    return (
      <p className='message'>{this.state.message}</p>
    );
  }
}

class Button extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      classes: 'btn btn-lg selector  ' + this.props.addClass,
      selector: this.props.addClass
    };
  }

  render(){
    return(
      <button type="button" 
              className={this.state.classes}
              onClick={this.props.onClick}>
        {this.state.selector}
      </button>
    );
  }
}


var rootDiv = document.querySelector('#root')

ReactDOM.render(<App />, rootDiv);



const yeezy = 'https://api.kanye.rest?format=json',
      trump = 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
;


var yeezyOrTrump,
    calloutURL,
    responseMessage
;

getMessage();

document.querySelector('button.trump').addEventListener("click", () => {
  alertResult(trump);
});

document.querySelector('button.kanye').addEventListener("click", () => {
  alertResult(yeezy);
});


function alertResult(url) {
  if (calloutURL === url) {
    console.log("You win!");
  } else {
    console.log("You lose!");
  }
  getMessage();
}


function getMessage() {
  yeezyOrTrump =  (Math.round((Math.random() * 1) + 0) === 0);
  calloutURL = yeezyOrTrump ? yeezy : trump;

  fetch(calloutURL)
    .then((res) => { return res.json() })
    .then((data) => {

      if (yeezyOrTrump) {
        yeezyMessage(data);
      } else {
        trumpMessage(data);
      }

      document.querySelector('p.message').innerText = responseMessage;

    });

    function trumpMessage(data){
      responseMessage = data.message;
    }
    function yeezyMessage(data){
      responseMessage = data.quote;
    }

} // end getMessage()


