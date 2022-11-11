import React from "react";
import { reduxForm, InjectedFormProps } from 'redux-form';
import { SimpleBtn } from "../../common/Buttons/SimpleButton/SimpleBtn";
import { createField } from "../../common/FormControls/FormControl";
import { DialogsFormDataValuesType } from "./Dialogs";


type DialogsFormValuesTypeKeys = Extract<keyof DialogsFormDataValuesType, string>

const DialogsForm: React.FC<InjectedFormProps<DialogsFormDataValuesType>> = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createField<DialogsFormValuesTypeKeys>('Enter text', 'sentMessage', 'textarea', { type: 'text' }, "", [])}
            <SimpleBtn btn_text='Send Message' />
        </form>
    );
}

export default reduxForm<DialogsFormDataValuesType>({ form: 'dialogsForm' })(DialogsForm);