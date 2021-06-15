import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { ChakraProvider } from "@chakra-ui/react"
import Home from './pages/Home'

function App() {

  // const { sendMessage, lastMessage, readyState } = useWebSocket('ws://localhost:3001/echo')

  // useEffect(() => {
  //   fetch('/api/ping').then(res => res.text()).then(console.log)
  // }, [])

  // useEffect(() => {
  //   console.log(readyState)
  // }, [readyState])

  return (
    <ChakraProvider>
      <Router>
        <Switch>
          <Route path="/">
            <Home></Home>
          </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;
