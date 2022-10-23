import React from 'react';
import styles from './Paginator.module.css';

const Paginator = ({ totalUsersCount, pageSize, currentPage, onPageChanged }) => {
   let pagesCount = Math.ceil(totalUsersCount / pageSize) / 140;
   let pages = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }
   return <div className={styles.paginationBlock}>
      {pages.map(p => <div key={p}>
         <button
            onClick={(e) => { onPageChanged(p) }}
            className={currentPage === p ? styles.currentPage : ''}>{p}</button>
      </div>)}
   </div>
}

export default Paginator;