import React, { useEffect } from "react";
import UserItem from "./UserItem/UserItem";
import styles from './Users.module.css';
import Paginator from '../../common/Pagination/Paginator';
import UsersSearchForm from "./UsersSearchForm";
import { actions, FilterType, requestUsers } from "../../redux/users-reducer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import {
    getCurrentPage, getFilterUsers, getFollowingInProgress,
    getPageSize, getTotalItemsCount, getUsers
} from "../../redux/selectors/users-selectors";
import { useNavigate, useSearchParams } from "react-router-dom";

type PropsType = {
    isFetching: boolean
}
export const Users: React.FC<PropsType> = ({ isFetching }) => {

    const users = useSelector(getUsers)
    const followingInProgress = useSelector(getFollowingInProgress)
    const filter = useSelector(getFilterUsers)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const totalItemsCount = useSelector(getTotalItemsCount)
    const navigate = useNavigate()
    const [searchParams]: any = useSearchParams();
    const dispatch: any = useDispatch()

    useEffect(() => {
        const searchParamsObj = Object.fromEntries([...searchParams]);
        const {term, friend, page} = searchParamsObj
        let actualPage = currentPage
        let actualFilter = filter
        if (page) actualPage = Number(searchParamsObj.page)
        if (term) actualFilter = {...actualFilter, term: term}
        switch(friend){
            case 'null':
                actualFilter = {...actualFilter, friend: null}
                break
            case 'true':
                actualFilter = {...actualFilter, friend: true}
                break
            case 'false':
                actualFilter = {...actualFilter, friend: false}
                break
        }
        dispatch(requestUsers(actualPage, pageSize, actualFilter))
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
    useEffect(() => {
        navigate(`/users?term=${filter.term}&friend=${filter.friend}&page=${currentPage}`)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [filter, currentPage])

    const onPageChanged = (page: number) => {
        dispatch(requestUsers(page, pageSize, filter))
    }

    const onFilterChanged = (filter: FilterType) => {
        dispatch(requestUsers(1, pageSize, filter))
    }

    return (
        <div className={styles.users}>
            <div className={styles.usersSearchForm}>
                <UsersSearchForm onFilterChanged={onFilterChanged} />
            </div>
            <div className={styles.userItemsRow}>
                {users.map(u => <UserItem key={u.id} userId={u.id}
                    userPhoto={u.photos.small}
                    followed={u.followed}
                    userName={u.name}
                    status={u.status}
                    isFetching={isFetching}
                    setIsFetching={actions.setIsFetching}
                    setFollowingInProgress={actions.setFollowingInProgress}
                    followingInProgress={followingInProgress}
                    followSuccess={actions.followSuccess}
                    unfollowSuccess={actions.unfollowSuccess} />)}
            </div>
            <div className={styles.paginationBlock}>
                <Paginator currentPage={currentPage} totalItemsCount={totalItemsCount}
                    pageSize={pageSize} onPageChanged={onPageChanged} portionSize={10} />
            </div>
        </div>
    );
}