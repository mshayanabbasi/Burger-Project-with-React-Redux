import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import Auth from './containers/Auth/Auth'
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Logout from './containers/Auth/Logout/Logout';
import { connect } from 'react-redux'
import * as actions from './store/actions/index'
class App extends Component {
  componentDidMount() {
    this.props.onTryAutoSignUp()
  }
  render () {
    let routes = (
      <Switch>
        <Route path="/auth" render={() => <Auth />} />
        <Route path="/" exact render={() => <BurgerBuilder />} />
      </Switch>
    ) 
    if (this.props.isAuthenticated) {
      routes = (
        <Switch>
          <Route path="/checkout" render={()=> <Checkout/>}  />
          <Route path="/orders" render={() => <Orders />} />
          <Route path="/logout" render={() => <Logout />} />
          <Route path="/" exact render={() => <BurgerBuilder />} />
        </Switch>
      )
    }
    return (
      <div>
        <Layout>
          {routes}  
        </Layout>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    isAuthenticated: state.auth.token !== null
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignUp: () => dispatch(actions.authCheckState())
  }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
