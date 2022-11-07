import React from 'react';
import { useState } from 'react';
import styles from './Paginator.module.css';
import cn from 'classnames';

type PropsType = {
   totalItemsCount: number
   pageSize: number
   currentPage: number
   onPageChanged: (pageNumber: number) => void
   portionSize?: number
}
const Paginator: React.FC<PropsType> = ({ totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10 }) => {
   let pagesCount = Math.ceil(totalItemsCount / pageSize);
   let portionCount = Math.ceil(pagesCount / portionSize);
   let [portionNumber, setPortionNumber] = useState(1);
   let leftBorderElement = (portionNumber - 1) * portionSize + 1
   let rightBorderElement = portionNumber * portionSize;

   let pages: Array<number> = []
   for (let i = 1; i <= pagesCount; i++) {
      pages.push(i);
   }

   return <>
      {portionNumber > 1 &&
         <button className={styles.prevAndNextBtn} onClick={() => { setPortionNumber(portionNumber - 1) }}>Prev</button>}
      {pages.filter(p => p >= leftBorderElement && p <= rightBorderElement).map(p => {
         return (
            <div key={p}>
               <button
                  onClick={(e) => { onPageChanged(p) }}
                  className={cn({ [styles.currentPage]: currentPage === p }, styles.pageNumber)}>{p}</button>
            </div>
         );
      })}
      {portionNumber < portionCount &&
         <button className={styles.prevAndNextBtn} onClick={() => { setPortionNumber(portionNumber + 1) }}>Next</button>}
   </>
}

export default Paginator;