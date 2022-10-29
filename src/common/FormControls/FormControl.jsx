import React from 'react';
import styles from './FormControl.module.css';
import { Field } from 'redux-form';

export const FormControl = ({ input, meta: { touched, error }, children, ...props }) => {
   const hasError = touched && error;
   return (
      <div className={styles.formControl + ' ' + (hasError ? styles.error : '')}>
         <div>
            {children}
         </div>
         {hasError && <span>{error}</span>}
      </div>
   );
}
export const Input = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <input {...props.input} {...restProps} /> </FormControl>
}
export const Textarea = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <textarea {...props.input} {...restProps} /> </FormControl>
}

export const createField = (placeholder, name, component, props = {}, text = "", validators) => {
   return <div>
      <Field placeholder={placeholder} name={name}
         component={component} validate={validators} {...props} />{text}
   </div>
}
