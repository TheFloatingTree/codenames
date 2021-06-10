import logo from './logo.svg';
import './App.css';
import { useEffect } from 'react'
import useWebSocket from 'react-use-websocket'

function App() {

  const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3001/echo')

  useEffect(() => {
    fetch('/api/ping').then(res => res.text()).then(console.log)
  }, [])

  useEffect(() => {
    console.log(readyState)
  }, [readyState])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <button onClick={() => {sendMessage('hello')}}>{ lastMessage?.data }</button>
      </header>
    </div>
  );
}

export default App;
