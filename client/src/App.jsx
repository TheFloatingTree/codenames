import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider, theme } from "@chakra-ui/react"
import Home from './pages/Home'
import Title from './pages/Title'
import React from 'react';
import { Provider } from 'react-redux';
import store from './redux/store';

function App() {

  // const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3001/echo')

  // useEffect(() => {
  //   fetch('/api/ping').then(res => res.text()).then(console.log)
  // }, [])

  // useEffect(() => {
  //   console.log(readyState)
  // }, [readyState])

  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Router>
          <Switch>
            <Route exact path="/" component={Title}></Route>
            <Route path="/game/:room" component={Home}></Route>
          </Switch>
        </Router>
      </ChakraProvider>
    </Provider>
  );
}

export default App;
