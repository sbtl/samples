import React from 'react';
import {Provider} from 'react-redux';
import {Router, Route, IndexRoute} from 'react-router';
import configureStore from '../store/configureStore';

import App from '../containers/App';
import Intro from '../containers/Intro';
import Podcast from '../containers/Podcast';
import BuyPodcast from '../containers/BuyPodcast';
import ViewEpisode from '../containers/ViewEpisode';
import InfoPage from '../containers/InfoPage';
import SearchResults from '../containers/SearchResults';

import Dashboard from '../containers/Dashboard';
import DashboardAltLayout from '../containers/DashboardAltLayout';

import MyProfile from '../containers/dashboard/MyProfile';
import PremiumSubscriptions from '../containers/dashboard/PremiumSubscriptions';
import Subscriptions from '../containers/dashboard/Subscriptions';
import PaymentMethod from '../containers/dashboard/PaymentMethod';
import PaymentMethodChange from '../containers/dashboard/PaymentMethodChange';
import Transaction from '../containers/dashboard/Transaction';
import Transactions from '../containers/dashboard/Transactions';

export default function (history) {
    return (
        <Router onUpdate={() => window.scrollTo(0, 0)} history={history}>
            <Route path="/" component={App}>
                <Route path="for-podcasters" component={InfoPage} />
                <Route path="om-podme" component={InfoPage} />
                <Route path="kontakt" component={InfoPage} />
                <Route path="fragor-och-svar" component={InfoPage} />
                <Route path="priser" component={InfoPage} />

                <Route path="podcast/:id" component={Podcast} />
                <Route path="buypodcast/:type/:id" component={BuyPodcast} />
                <Route path="view/:id" component={ViewEpisode} />

                <Route path="search/:key" component={SearchResults} />

                <Route path="dashboard" component={Dashboard}>
                    <IndexRoute component={MyProfile} />
                    <Route path="my-profile" component={MyProfile} />
                    <Route path="my-premium-subscriptions" component={PremiumSubscriptions} />
                    <Route path="my-subscriptions" component={Subscriptions} />
                    <Route path="payment-method" component={PaymentMethod} />
                    <Route path="transactions/:id" component={Transaction} />
                    <Route path="transactions" component={Transactions} />
                </Route>

                <Route path="dashboard" component={DashboardAltLayout}>
                    <Route path="payment-method/change" component={PaymentMethodChange} />
                </Route>

                <IndexRoute component={Intro} />
            </Route>
        </Router>
    )
}
