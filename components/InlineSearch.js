import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Link, browserHistory } from 'react-router';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { getSearchResults } from '../../actions/search';

import Loader from '../general/Loader';

// Reference for dropdown functionality: https://stackoverflow.com/a/42234988/7678570

class InlineSearch extends Component {
    constructor(props) {
        super(props);

        this.state = {
            active: false,
            hasMadeRequest: false,
            loading: false,
            key: ''
        };

        this.timeout = null;

        this.activate = this.activate.bind(this);
        this.deactivate = this.deactivate.bind(this);

        this.onKeyChange = this.onKeyChange.bind(this);
        this.handleKeyInteractions = this.handleKeyInteractions.bind(this);

        this.setWrapperRef = this.setWrapperRef.bind(this);
        this.handleClickOutside = this.handleClickOutside.bind(this);
    }

    componentDidMount() {
        document.addEventListener('mousedown', this.handleClickOutside);
    }

    componentWillUnmount() {
        document.removeEventListener('mousedown', this.handleClickOutside);
    }

    setWrapperRef(node) {
        this.wrapperRef = node;
    }

    handleClickOutside(event) {
        if (this.wrapperRef && !this.wrapperRef.contains(event.target)) {
            this.deactivate();
        }
    }

    activate() {
        this.setState({
            active: true
        });
    }

    deactivate() {
        this.setState({
            active: false
        });
    }

    onKeyChange(event) {
        const key = event.target.value;

        this.setState({
            key: key,
            loading: true
        });

        clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
            this.props.getSearchResults(key)
                .then(() => {
                    this.setState({
                        loading: false,
                        hasMadeRequest: true
                    });
                });
        }, 400);
    }

    handleKeyInteractions(event) {
        // On Enter press
        if (event.key === 'Enter' && this.state.key) {
            this.deactivate();
            event.target.blur();
            browserHistory.push(`/search/${this.state.key}`)
        }
    }

    render() {
        let searchClass = classNames({
            'inline-search': true,
            '-active': this.state.active,
            '-openontop': this.props.openOnTop
        });

        return (
            <div className="inlinesearch-wrapper">
                <div className={searchClass} ref={this.setWrapperRef}>
                    <input type="text"
                        name="key"
                        placeholder="Sök podcasts"
                        className="key"
                        autoComplete="off"
                        value={this.state.key}
                        onFocus={this.activate}
                        onChange={this.onKeyChange}
                        onKeyPress={this.handleKeyInteractions} />

                    {this.state.active && this.state.key ?
                        <div>
                            {this.state.loading ? <Loader /> :
                                <div>
                                    {this.props.results.get('data').size > 0 ?
                                        <div className="keyinfo">
                                            Sök efter "{this.state.key}"
                                        </div>
                                    : null}

                                    {this.state.loading ?
                                        <Loader />
                                    : null}

                                    <ul className="suggestions">
                                        {this.props.results && this.props.results.get('data').map(result => {
                                            return (
                                                <li key={result.get('title')}>
                                                    <Link to={`/podcast/${result.get('id')}`} onClick={this.deactivate}>
                                                        {result.get('title')}
                                                    </Link>
                                                </li>
                                            )
                                        })}

                                        {this.props.results.get('data').size === 0 && this.state.hasMadeRequest ?
                                            <li className="noresults">Inga träffar för "{this.state.key}"</li>
                                        : null}
                                    </ul>

                                    {this.props.results.get('data').size > 0 ?
                                        <Link to={`/search/${this.state.key}`}
                                            className="submit"
                                            onClick={this.deactivate}>
                                            Se alla resultat
                                        </Link>
                                    : null}
                                </div>
                            }
                        </div>
                    : null}
                </div>
            </div>
        );
    }
}

InlineSearch.defaultProps = {
    openOnTop: false
};

InlineSearch.PropTypes = {
    openOnTop: PropTypes.bool
};

function mapStateToProps(state) {
    return {
        results: state.search
    }
}

export default connect(mapStateToProps, { getSearchResults })(InlineSearch);
