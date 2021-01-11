import React, { useEffect } from 'react';

import CoinChart from "../Coin";
import { CoinMetaData } from ".";

import "./WatchCoin.css";
import { RouteChildrenProps, withRouter } from 'react-router-dom';
import { params, Coin } from '../../store/types';
import { getParamValue } from "../../utils/uri";
import { connect } from "react-redux";
import { ICoinState } from '../../store/interfaces/ICoinState';
import { GetCoinById } from '../../store/action-creators/action-creator';

interface IWatchCoin extends RouteChildrenProps<params> {

    coin: Coin;
    isCoinClientLoaded: boolean;
    getCoinById(coinId: string): void;
}

const WatchCoin = (props: IWatchCoin) => {

    const getCoinId = () => {
        return getParamValue(props.location, "v") || "";
    }

    let coinId = getCoinId();

    useEffect(() => {
        if (props.isCoinClientLoaded && coinId) {
            props.getCoinById(coinId);
        }
    }, [coinId, props.isCoinClientLoaded])
    return (<div className="watch_coin">
        <CoinChart coinId={coinId} />
        <CoinMetaData coin={props.coin} />
    </div>)
}

const mapStateToProps = (state: ICoinState) => {
    return {
        coin: state.coin,
        isCoinClientLoaded: state.isCoinClientLoaded
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        getCoinById: (coinId: string) => dispatch(GetCoinById(coinId))
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(WatchCoin));