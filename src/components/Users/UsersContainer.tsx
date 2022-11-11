import React from "react";
import { connect } from "react-redux";
import { requestUsers } from  "../../redux/users-reducer";
import { actions } from  "../../redux/users-reducer";
import Users from './Users';
import Preloader from "../../common/Preloader/Preloader";
import { compose } from "redux";
import { getCurrentPage, getFollowingInProgress, getIsFetching, 
         getPageSize, getTotalItemsCount, getUsers} from "../../redux/selectors/users-selectors";
import { UsersType } from "../../types/types";
import { AppStateType } from "../../redux/redux-store";

type MapStateToPropsType = {
    totalItemsCount: number
    users: Array<UsersType>
    followingInProgress: Array<number>
    isFetching: boolean
    currentPage: number
    pageSize: number
}
type MapDispatchToPropsType = {
    requestUsers: (page: number, pageSize: number) => void
    setIsFetching: (isFetching: boolean) => void
    setFollowingInProgress: (isFetching: boolean, userId: number) => void
    followSuccess: (userId: number) => void
    unfollowSuccess: (userId: number) => void
}

class UsersAPIComponent extends React.Component<MapStateToPropsType & MapDispatchToPropsType> {
    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize);
    }
    onPageChanged = (page: number) => {
        this.props.requestUsers(page, this.props.pageSize)
    }
    render() {
        return <>
            {this.props.isFetching ? <Preloader /> : null}
            <Users totalItemsCount={this.props.totalItemsCount}
                pageSize={this.props.pageSize}
                currentPage={this.props.currentPage}
                users={this.props.users}
                onPageChanged={this.onPageChanged}
                isFetching={this.props.isFetching}
                setIsFetching={this.props.setIsFetching}
                setFollowingInProgress={this.props.setFollowingInProgress}
                followingInProgress={this.props.followingInProgress}
                followSuccess={this.props.followSuccess}
                unfollowSuccess={this.props.unfollowSuccess} />
        </>
    }
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
    return {
        users: getUsers(state),
        totalItemsCount: getTotalItemsCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        followingInProgress: getFollowingInProgress(state),
    }
}

export default compose(connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(mapStateToProps, 
    { requestUsers,
    setFollowingInProgress: actions.setFollowingInProgress, 
    setIsFetching: actions.setIsFetching, 
    followSuccess: actions.followSuccess, 
    unfollowSuccess: actions.unfollowSuccess })
)(UsersAPIComponent)
