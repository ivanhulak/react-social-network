import React from "react";
import { InjectedFormProps, reduxForm } from 'redux-form';
import styles from './Login.module.css';
import { required, maxLength, email } from '../../utils/validator';
import { createField, Input } from '../../common/FormControls/FormControl';

let maxLength50 = maxLength(50);
let maxLength16 = maxLength(16);

type PropsType = {
   captchaURL: string | null
}
export type LoginFormDataValuesType = { 
   email: string 
   password: string 
   rememberMe: boolean
   captcha: string
}
type LoginFormValuesTypeKeys = Extract<keyof LoginFormDataValuesType, string>

const LoginForm: React.FC<InjectedFormProps<LoginFormDataValuesType, PropsType> & PropsType> = (props) => {
   const { handleSubmit, submitting, pristine, reset } = props;
   return (
      <form onSubmit={handleSubmit} className={styles.loginForm + ' ' + (props.error ? styles.fullFormError : '')}>
         <div className={styles.title}>Sign in</div>
         <div className={styles.email}>
            <label htmlFor="email">E-mail</label>
            {createField<LoginFormValuesTypeKeys>('e-mail', 'email', Input, {type:"text"}, "", [required, maxLength50, email])}
         </div>
         <div className={styles.password}>
            <label htmlFor="password">Password</label>
            {createField<LoginFormValuesTypeKeys>('password', 'password', Input, {type:"password"}, "", [required, maxLength16])}
         </div>
         <div className={styles.rememberMe}>
            {createField<LoginFormValuesTypeKeys>(undefined, 'rememberMe', 'input', {type:"checkbox"}, "Remember me", [])}
         </div>
         {props.captchaURL && <div>
            <img src={props.captchaURL} alt="" />
            {createField<LoginFormValuesTypeKeys>('anti-bot symbols', 'captcha', Input, {type:"text"}, "Remember me", [required])}
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

export default reduxForm<LoginFormDataValuesType, PropsType>({ form: 'login' })(LoginForm);