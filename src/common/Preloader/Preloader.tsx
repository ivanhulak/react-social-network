import React from "react";
import styles from './Preloader.module.css';
import loading from '../../assets/images/load.gif'

const Preloader: React.FC = () => {
    return (
        <div className={styles.preloader}>
            <img src={loading} alt="Loading..." />
        </div>
    );
}

export default Preloader;