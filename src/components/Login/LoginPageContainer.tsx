import React from "react";
import LoginPage from './LoginPage';
import { connect } from "react-redux";
import { login } from '../../redux/auth-reducer';
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
    isAuth: boolean
    userId: number | null
    captchaURL: string | null
}
type MapDispatchToPropsType = {
    login: (email: string, password: string, rememberMe: boolean, captcha: string ) => void
}

const LoginPageContainer: React.FC<MapStateToPropsType & MapDispatchToPropsType> = (props) => {
    return <LoginPage login={props.login} isAuth={props.isAuth} userId={props.userId} captchaURL={props.captchaURL} />
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
    isAuth: state.auth.isAuth,
    userId: state.auth.userId,
    captchaURL: state.auth.captchaURL
})

export default connect<{}, {}, {}, AppStateType>(mapStateToProps, { login })(LoginPageContainer);