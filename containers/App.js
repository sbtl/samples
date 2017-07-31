import React, {Component} from 'react'
import {connect} from 'react-redux'
import Helmet from 'react-helmet'
import Footer from './../components/layout/Footer';
import { getUsername, logOut } from '../actions/user';
import AppNavigation from './../components/layout/AppNavigation';
import CookiesWarning from './../components/cookies/CookiesWarning';

class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('App mounted');
  }

  render() {
    return (
      <div>
        <Helmet
          defaultTitle="PodMe "
          titleTemplate="%s - PodMe Podcasts"
          meta={[
            {
              "name": "description",
              "content": "Content"
            },
          ]}
          htmlAttributes={{"lang": "en"}} />

        <CookiesWarning />

        <div className="app-wrapper">
          <AppNavigation
            loggedIn={this.props.user.get('loggedIn')}
            username={this.props.user.get('username')}
            getUsername={this.props.getUsername}
            logOut={this.props.logOut} />

          <div>
            {this.props.children}
          </div>

          <Footer />
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps, { getUsername, logOut })(App);
