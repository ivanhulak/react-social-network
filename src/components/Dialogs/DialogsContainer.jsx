import Dialogs from './Dialogs';
import { sendMessage, updateTextSendMessage } from '../../redux/dialogs-reducer';
import { connect } from 'react-redux';
import { withAuthRedirect } from '../HOC/withAuthRedirect';
import { compose } from 'redux';


const mapStateToProps = (state) => {
    return {
        newMessageText: state.dialogsPage.newMessageText,
        dialogs: state.dialogsPage.dialogs,
        messages: state.dialogsPage.messages,
    }
}

export default compose(withAuthRedirect,
    connect(mapStateToProps, { sendMessage, updateTextSendMessage }))(Dialogs);