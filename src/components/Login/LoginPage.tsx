import React from "react";
import { InjectedFormProps, reduxForm } from 'redux-form';
import styles from './Login.module.css';
import { required, maxLength, email } from '../../utils/validator';
import { createField, Input } from '../../common/FormControls/FormControl';
import { Navigate } from "react-router-dom";
import { AppStateType } from "../../redux/redux-store";
import { login } from '../../redux/auth-reducer';
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";

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
            <p>E-mail</p>
            {createField<LoginFormValuesTypeKeys>('e-mail', 'email', Input, { type: "text" }, "", [required, maxLength50, email])}
         </div>
         <div className={styles.password}>
            <p>Password</p>
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

export type LoginFormDataValuesType = {
   email: string
   password: string
   rememberMe: boolean
   captcha: string | null
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormDataValuesType, string>

const StyledForm = styled.div`
   display: flex;
   justify-content: center;
   align-items: center;
`;
export const LoginPage: React.FC = () => {

   const captchaURL = useSelector((state: AppStateType) => state.auth.captchaURL)
   const isAuth = useSelector((state: AppStateType) => state.auth.isAuth)
   const userId = useSelector((state: AppStateType) => state.auth.userId)
   const dispatch: any = useDispatch()

   const onSubmit = (formData: LoginFormDataValuesType) => {
      dispatch(login(formData.email, formData.password, formData.rememberMe, formData.captcha));
   }

   if (isAuth) {
      return <Navigate to={`/profile/${userId}`} />
   }

   return (
      <StyledForm>
         <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL} />
      </StyledForm>
   )
}