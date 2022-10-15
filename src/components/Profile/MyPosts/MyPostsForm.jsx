import React from 'react';
import { Field, reduxForm } from 'redux-form';

const MyPostsForm = (props) => {
   return (
      <form onSubmit={props.handleSubmit}>
         <Field placeholder='Create post' name='postText' component='textarea' />
         <div>
            <button>Add post</button>
         </div>
      </form>
   );
}

export default reduxForm({ form: 'myPostsForm' })(MyPostsForm);