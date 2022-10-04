import React from "react";
import loading from './../assets/images/load.gif'

const Preloader = () => {
    return (
        <div>
            <img src={loading} alt="Loading..." />
        </div>
    );
}

export default Preloader;