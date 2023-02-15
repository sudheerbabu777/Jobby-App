import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import Jobs from './components/Jobs'
import NotFound from './components/NotFound'
import ProtectedRouter from './components/ProtectedRouter'
import JobItemDetails from './components/JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.

// Replace your code here
const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRouter exact path="/" component={Home} />
      <ProtectedRouter exact path="/jobs" component={Jobs} />
      <Route exact path="/jobs/:id" component={JobItemDetails} />
      <Route path="/not-found" component={NotFound} />
      <Redirect to="/not-found" />
    </Switch>
  </>
)

export default App
