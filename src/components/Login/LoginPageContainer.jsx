import React from "react";
import LoginPage from './LoginPage';
import { connect } from "react-redux";
import { login } from '../../redux/auth-reducer.ts';

const LoginPageContainer = (props) => {

    return <LoginPage login={props.login} isAuth={props.isAuth} userId={props.userId} captchaURL={props.captchaURL} />
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    captchaURL: state.auth.captchaURL
})

export default connect(mapStateToProps, { login })(LoginPageContainer);