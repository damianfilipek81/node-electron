import React from 'react';
import { render } from 'react-dom';
const { remote } = require('electron')

class App extends React.Component {
  state = {
    status: 'off',
    time: 1200,
    timer: null,
  }

  formatTime = (input) => {
    let minutes;
    let seconds;

    seconds = input % 60;
    minutes = Math.floor(input / 60);

    seconds < 10 ? seconds = `0${seconds}` : seconds;
    minutes < 10 ? minutes = `0${minutes}` : minutes;
    return `${minutes}:${seconds}`
  }

  step = () => {

    if (this.state.time == 0 && this.state.status === 'work') {
      this.setState({ status: 'rest', time: 20 });
      this.playBell();
    } else if (this.state.time == 0 && this.state.status === 'rest') {
      this.setState({ status: 'work', time: 1200 });
      this.playBell();
    } else {
      this.setState({ time: this.state.time - 1 });
    }
  }

  startTimer = () => {
    this.setState({
      time: 1200,
      status: 'work',
      timer: setInterval(this.step, 1000),
    });
  }

  stopTimer = () => {
    this.setState({
      timer: clearInterval(this.state.timer),
      time: 0,
      status: 'off',
    })
  }

  closeApp = () => {
    window.close();
  }

  minimizeApp = () => {
    remote.BrowserWindow.getFocusedWindow().minimize();
  }

  playBell = () => {
    const audioElement = new Audio('./sounds/bell.wav');
    audioElement.play();
  }

  render() {
    const { status, time } = this.state;
    return (
      <div>
        <h1>Protect your eyes</h1>
        {status === 'off' ?
          <div>
            <p>According to optometrists in order to save your eyes, you should follow the 20/20/20. It means you should to rest your eyes every 20 minutes for 20 seconds by looking more than 20 feet away.</p>
            <p>This app will help you track your time and inform you when it's time to rest.</p>
          </div> : null}
        {status === 'work' ? <img src="./images/work.png" /> : null}
        {status === 'rest' ? <img src="./images/rest.png" /> : null}
        {status !== 'off' ?
          <div className="timer">
            {this.formatTime(time)}
          </div> : null}
        {status === 'off' ?
          <button className="btn" onClick={this.startTimer}>Start</button> : null}
        {status !== 'off' ?
          <button className="btn" onClick={this.stopTimer}>Stop</button> : null}
        <button className="btn btn-minimize" onClick={this.minimizeApp}>_</button>
        <button className="btn btn-close" onClick={this.closeApp}>X</button>
      </div>
    )
  }
};

render(<App />, document.querySelector('#app'));
