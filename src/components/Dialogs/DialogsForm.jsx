import React from "react";
import { reduxForm, Field } from 'redux-form';
import { SimpleBtn } from "../../common/Buttons/SimpleButton/SimpleBtn";

const DialogsForm = ({ handleSubmit }) => {
    return (
        <form onSubmit={handleSubmit}>
            <Field placeholder="Отправить сообщение" name='sentMessage' component='textarea' />
            <SimpleBtn btn_text='Send Message' />
        </form>
    );
}

export default reduxForm({ form: 'dialogsForm' })(DialogsForm);