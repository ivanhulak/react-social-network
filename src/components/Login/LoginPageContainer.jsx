import React from "react";
import LoginPage from './LoginPage';
import { connect } from "react-redux";
import { login } from '../../redux/auth-reducer';

const LoginPageContainer = (props) => {

    return <LoginPage login={props.login} isAuth={props.isAuth} userId={props.userId}/>
}

const mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId
})

export default connect(mapStateToProps, {login})(LoginPageContainer);