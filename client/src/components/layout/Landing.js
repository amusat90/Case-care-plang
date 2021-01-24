import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {connect} from 'react-redux';
import {loginUser, logoutUser} from '../../actions/authActions';

import {Link} from 'react-router-dom';
import {LABELS} from '../../constants/strings';


class Landing extends Component {
    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    render() {
        return (
            <div className="landing">
                <div className="dark-overlay landing-inner text-light">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12 text-center">
                                <h1 className="display-3 mb-4">{LABELS.appTitle}</h1>
                                <h2 className="lead">
                                    {' '}
                                    {LABELS.landingPageSubtitle}
                                </h2>
                                <hr/>
                                <p className="display-4 mb-4">
                                "Some listed buildings end up losing their economic value due to the neglect of their owners. Our NGO aims to stop this from happening by drawing attention to those properties and their architectural identity."
                                </p>
                                <p class="text-right">
                                    Marcus Aurelius, head of NGO
                                </p>
                                <Link className="btn btn-lg btn-info mr-2" to ="/register">Sign Up</Link>
                                <Link className="btn btn-lg btn-light" to ="/login">Login</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth
})

export default connect(mapStateToProps, {loginUser})(Landing);

