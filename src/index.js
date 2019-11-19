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
      kanyeOrTrump: null,
      trump: 'https://api.whatdoestrumpthink.com/api/v1/quotes/random',
      kanye: 'https://api.kanye.rest?format=json',
      message: null,
      calloutURL: null,
    };

    this.getMessage();




  }


  handleClick() {
    let score = this.state.score;
    this.setState({
      score: ++score,
    });
    console.log("handleClick clicked");
    this.getMessage();
  }

  renderButton(c){
    return(
      <Button addClass={c} onClick={() => {this.handleClick()}} />
    );
  }

  getMessage(){
    this.setState({
      kanyeOrTrump: (Math.round((Math.random() * 1) + 0) === 0) ? 'kanye' : 'trump',
      calloutURL: this.state.kanyeOrTrump ? this.state.kanye : this.state.trump
    });

    fetch(this.state.calloutURL)
      .then((res) => { return res.json() })
      .then((data) => {


        if (this.state.kanyeOrTrump) {
          this.setState({
            message: data.quote
          });

        } else {
          this.setState({
            message: data.message
          }); 
        }


      });
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
  }

  render() {
    return (
      <p className='message'>{this.props.text}</p>
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

var rootDiv = document.querySelector('#root');
ReactDOM.render(<App />, rootDiv);
