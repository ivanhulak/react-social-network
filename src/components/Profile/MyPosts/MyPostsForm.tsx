import React from 'react';
import { InjectedFormProps, reduxForm } from 'redux-form';
import { SimpleBtn } from '../../../common/Buttons/SimpleButton/SimpleBtn';
import { createField, Textarea } from '../../../common/FormControls/FormControl';
import { required, maxLength } from '../../../utils/validator';
import { MyPostsFormDataValuesType } from './MyPosts';

let maxLength250 = maxLength(250);

type MyPostsFormValuesTypeKeys = Extract<keyof MyPostsFormDataValuesType, string>

const MyPostsForm: React.FC<InjectedFormProps<MyPostsFormDataValuesType>> = ({handleSubmit}) => {
   return (
      <form onSubmit={handleSubmit}>
         {createField<MyPostsFormValuesTypeKeys>('Create post', 'postText', Textarea, {type: 'text'}, '', [required, maxLength250])}
         <SimpleBtn btn_text='Add post' />
      </form>
   );
}

export default reduxForm<MyPostsFormDataValuesType>({ form: 'myPostsForm' })(MyPostsForm);