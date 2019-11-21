import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import {yeezyOrTrump} from './kanyeortrump.js';
import 'bootstrap/dist/css/bootstrap.min.css';


class App extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      score: 0,
      message: '',
      calloutURL: '',
      kanyeOrTrump: '',

      urls: {
        kanye: 'https://api.kanye.rest?format=json',
        trump: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random'
      },

    };
  }

  componentDidMount(){
    this.getMessage();
  }

  getCalloutURL() {
    return ((Math.round((Math.random() * 1) + 0) === 0) ? this.state.urls.kanye : this.state.urls.trump);
  }

  callBack(data){
    
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


  getMessage(){
    let url = this.getCalloutURL();
    let kanyeOrTrump = (url === this.state.urls.kanye ? 'kanye' : 'trump');

    this.setState({
      calloutURL: url,
      kanyeOrTrump: kanyeOrTrump
    }, this.makeAPICall);
  }


  makeAPICall(){

    console.log("makeAPICall(): " + this.state.calloutURL);

    fetch(this.state.calloutURL)
      .then((res) => {return res.json()})
      .then((data) => {

        this.callBack(data);

      });
  }

  handleClick(buttonClass) {
    let newScore = (buttonClass === this.state.kanyeOrTrump) ? (this.state.score + 1) : (this.state.score - 1);

    this.setState({
      score: newScore,
    }, this.getMessage);
  }

  renderButton(buttonClass){
    return(
      <Button addClass={buttonClass} onClick={() => {this.handleClick(buttonClass)}} />
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
    <h3>Your score is: {props.score}</h3>
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
