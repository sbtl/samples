import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { browserHistory } from 'react-router';
import Helmet from 'react-helmet';
import classNames from 'classnames';

class Dashboard extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="app-dashboard">
        <div className="container">
          <div className="row">
            <div className="col-xs-3">
              <div className="box" style={{ height: '100%' }}>
                <nav className="dashboard-sidebar">
                  <div className="userinfo">
                    John Alexander Doe
                  </div>

                  <ul className="dashboard-navigation">
                    <li>
                      <Link to="/dashboard/my-profile"
                        className="-myprofile"
                        activeClassName="-active">
                        Min profil
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/my-premium-subscriptions"
                        className="-mypremiumsubscriptions"
                        activeClassName="-active">
                        Mina premiumabonnemang
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/my-subscriptions"
                        className="-mysubscriptions"
                        activeClassName="-active">
                        Mina prenumerationer
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/payment-method"
                        className="-paymentmethod"
                        activeClassName="-active">
                        Betalning
                      </Link>
                    </li>
                    <li>
                      <Link to="/dashboard/transactions"
                        className="-transactions"
                        activeClassName="-active">
                        Transaktionshistorik
                      </Link>
                    </li>
                  </ul>
                </nav>
              </div>
            </div>

            <div className="col-xs-9">
              <div className="box" style={{ height: '100%' }}>
                <div className="dashboard-page">
                  {this.props.children}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state, ownProps) {
  return {};
}

export default connect(mapStateToProps)(Dashboard);
