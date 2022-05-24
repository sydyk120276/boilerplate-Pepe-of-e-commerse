import React from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import { ConnectedRouter } from 'connected-react-router'
import { Provider, useSelector } from 'react-redux'

import store, { history } from '../redux'

import Startup from './startup'

// import Main from '../components/main'
import PrivateComponent from '../components/pivate'
import Home from '../components/home'
import Basket from '../components/basket'
import Logs from '../components/logs'
import LoginForm from '../components/signUp'

const OnlyAnonymousRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Redirect to="/channels" /> : <Component {...props} />
  }
  return <Route {...rest} render={func} />
}

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { user, token } = useSelector((s) => s.auth)
  const func = (props) => {
    return !!user && !!token ? <Component {...props} /> : <Redirect to="/login" />
  }
  return <Route {...rest} render={func} />
}

const Root = () => {
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <Startup>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/basket" component={Basket} />
            <Route exact path="/logs" component={Logs} />
            <Route exact path="/signup" component={LoginForm} />
            <OnlyAnonymousRoute exact path="/login" component={() => <Home />} />
            <PrivateRoute exact path="/private" component={() => <PrivateComponent />} />
          </Switch>
        </Startup>
      </ConnectedRouter>
    </Provider>
  )
}

export default Root
