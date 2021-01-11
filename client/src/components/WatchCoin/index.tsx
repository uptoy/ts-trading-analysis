import React from 'react';

import "./Coin.css";

const BASE_URL = "#"

interface ICoin {
    coinId : string;
}

const Coin = (props: ICoin) => {
    return (<div className="coin_container">
        <div className="coin">
            <iframe className="coin_chart" src={`${BASE_URL}${props.coinId}`} frameBorder="0"
                allowFullScreen title="coin" />
        </div>
    </div>)
}

export default Coin;