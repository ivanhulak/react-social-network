import Dialogs from './Dialogs';
import {sendMessage, updateTextSendMessage} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

const DialogsContainer = connect(mapStateToProps, {sendMessage, updateTextSendMessage})(Dialogs);

export default DialogsContainer;