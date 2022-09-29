import Dialogs from './Dialogs';
import {sendMessageAC, updateTextSendMessageAC} from '../../redux/dialogs-reducer';
import {connect} from 'react-redux';

const mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        sendMessage: () => {
            dispatch(sendMessageAC());
        },
        updateTextSendMessage: (text) => {
            dispatch(updateTextSendMessageAC(text));
        }
    }
}

const DialogsContainer = connect(mapStateToProps, mapDispatchToProps)(Dialogs);

export default DialogsContainer;