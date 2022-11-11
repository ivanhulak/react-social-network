import React from "react";
import { InjectedFormProps, reduxForm } from 'redux-form';
import styles from './Login.module.css';
import { required, maxLength, email } from '../../utils/validator';
import { createField, Input } from '../../common/FormControls/FormControl';
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { login } from '../../redux/auth-reducer';
import { connect } from "react-redux";


let maxLength50 = maxLength(50);
let maxLength16 = maxLength(16);


type PropsType = {
   captchaURL: string | null
}

const LoginForm: React.FC<InjectedFormProps<LoginFormDataValuesType, PropsType> & PropsType> = (props) => {
   const { handleSubmit, submitting, pristine, reset } = props;
   return (
      <form onSubmit={handleSubmit} className={styles.loginForm + ' ' + (props.error ? styles.fullFormError : '')}>
         <div className={styles.title}>Sign in</div>
         <div className={styles.email}>
            <label htmlFor="email">E-mail</label>
            {createField<LoginFormValuesTypeKeys>('e-mail', 'email', Input, { type: "text" }, "", [required, maxLength50, email])}
         </div>
         <div className={styles.password}>
            <label htmlFor="password">Password</label>
            {createField<LoginFormValuesTypeKeys>('password', 'password', Input, { type: "password" }, "", [required, maxLength16])}
         </div>
         <div className={styles.rememberMe}>
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', 'input', { type: "checkbox" }, "Remember me", [])}
         </div>
         {props.captchaURL && <div>
            <img src={props.captchaURL} alt="" />
            {createField<LoginFormValuesTypeKeys>('anti-bot symbols', 'captcha', Input, { type: "text" }, "Remember me", [required])}
         </div>}
         <div className={styles.buttons}>
            <button className={styles.formBtn} type="submit" disabled={submitting}>Login</button>
            <button className={styles.formBtn} type="button" disabled={pristine || submitting}
               onClick={reset}>Clear</button>
         </div>
         <span className={styles.fullFormErrorMessage}>{props.error}</span>
      </form>
   );
}
const LoginReduxForm = reduxForm<LoginFormDataValuesType, PropsType>({ form: 'login' })(LoginForm);



type MapStateToPropsType = {
   userId: number | null
   captchaURL: string | null
   isAuth: boolean
}
type MapDispatchToPropsType = {
   login: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
export type LoginFormDataValuesType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormDataValuesType, string>


const LoginPage: React.FC<MapStateToPropsType & MapDispatchToPropsType> = ({ login, isAuth, userId, captchaURL }) => {
   const onSubmit = (formData: LoginFormDataValuesType) => {
      login(formData.email, formData.password, formData.rememberMe, formData.captcha);
   }

   if (isAuth) {
      return <Navigate to={`/profile/${userId}`} />
   }

   return (
      <div className={styles.formBlock}>
         <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
      </div>
   )
}
const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
   captchaURL: state.auth.captchaURL,
   isAuth: state.auth.isAuth,
   userId: state.auth.userId
})

export default connect<MapStateToPropsType, {}, {}, AppStateType>(mapStateToProps, { login })(LoginPage);