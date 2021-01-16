import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {withRouter} from 'react-router-dom';
import classnames from 'classnames';
import {connect} from 'react-redux';
import {registerUser} from "../../actions/authActions";
import {BACKEND_ACCESSORS} from '../../constants/constants';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            [BACKEND_ACCESSORS.USER_NAME]: '',
            [BACKEND_ACCESSORS.USER_EMAIL]: '',
            [BACKEND_ACCESSORS.USER_PASSWORD]: '',
            [BACKEND_ACCESSORS.USER_PASSWORD_CONFIRMATION]: '',
            errors: {}
        };

        // this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount() {
        if(this.props.auth.isAuthenticated) {
            this.props.history.push('/dashboard');
        }
    }

    onChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
    }

    onSubmit(e) {
        e.preventDefault();

        const newUser = {
            [BACKEND_ACCESSORS.USER_NAME]: this.state[BACKEND_ACCESSORS.USER_NAME],
            [BACKEND_ACCESSORS.USER_EMAIL]: this.state[BACKEND_ACCESSORS.USER_EMAIL],
            [BACKEND_ACCESSORS.USER_PASSWORD]: this.state[BACKEND_ACCESSORS.USER_PASSWORD],
            [BACKEND_ACCESSORS.USER_PASSWORD_CONFIRMATION]: this.state[BACKEND_ACCESSORS.USER_PASSWORD_CONFIRMATION]
        };

        this.props.registerUser(newUser, this.props.history);
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.errors) {
            this.setState({errors: nextProps.errors});
        }
    }

    render() {
        const { errors } = this.state;

        return (
            <div className="register">
                <div className="container">
                    <div className="row">
                        <div className="col-md-8 m-auto">
                            <h1 className="display-4 text-center">Sign Up</h1>
                            <p className="lead text-center">
                                Join us in making history
                            </p>
                            <form noValidate onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.name
                                        })}
                                        placeholder="Name"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                    {errors.name && (
                                        <div className="invalid-feedback">{errors.name}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.email
                                        })}
                                        placeholder="Email Address"
                                        name="email"
                                        value={this.state.email}
                                        onChange={this.onChange}
                                    />
                                    {errors.email && (
                                        <div className="invalid-feedback">{errors.email}</div>
                                    )}
                                    
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.password
                                        })}
                                        placeholder="Password"
                                        name="password"
                                        value={this.state.password}
                                        onChange={this.onChange}
                                    />
                                    {errors.password && (
                                        <div className="invalid-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="form-group">
                                    <input
                                        type="password"
                                        className={classnames('form-control form-control-lg', {
                                            'is-invalid': errors.passwordConfirmation
                                        })}
                                        placeholder="Confirm Password"
                                        name="passwordConfirmation"
                                        value={this.state.passwordConfirmation}
                                        onChange={this.onChange}
                                    />
                                    {errors.passwordConfirmation && (
                                        <div className="invalid-feedback">{errors.passwordConfirmation}</div>
                                    )}
                                </div>
                                <input type="submit" className="btn btn-info btn-block mt-4" />
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    errors: state.errors
})

export default connect(mapStateToProps, {registerUser})(withRouter(Register));