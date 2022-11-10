import React from 'react';
import styles from './FormControl.module.css';
import { Field, WrappedFieldInputProps, WrappedFieldMetaProps } from 'redux-form';
import { ValidatorType } from '../../utils/validator';
import cn from 'classnames';

type FormControlType = {
   input: WrappedFieldInputProps
   meta: WrappedFieldMetaProps
   children: React.ReactNode
}
export const FormControl: React.FC<FormControlType> = ({ meta: { touched, error }, children }) => {
   const hasError = touched && error;
   return (
      <div className={cn({ [styles.error]: hasError }, styles.formControl)}>
         <div>
            {children}
         </div>
         {hasError && <span>{error}</span>}
      </div>
   );
}
export const Input: React.FC<FormControlType> = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <input {...props.input} {...restProps} /> </FormControl>
}
export const Textarea: React.FC<FormControlType> = (props) => {
   const { input, meta, ...restProps } = props;
   return <FormControl {...props}> <textarea {...props.input} {...restProps} /> </FormControl>
}

export function createField<FormKeysType extends string>(placeholder: string | undefined, 
                            name: FormKeysType, 
                            component: string | React.Component | React.FC<FormControlType>,
                            props = {}, text = "", 
                            validators: Array<ValidatorType>){
   return <div>
      <Field placeholder={placeholder} name={name}
         component={component} validate={validators} {...props} />{text}
   </div>
}