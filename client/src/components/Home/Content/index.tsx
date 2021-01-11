import React, { useState, useEffect } from 'react';
import { Grid } from './Grid';
import './Content.css';
import { InfiniteScroll } from '../../InfiniteScroll/InfiniteScroll.component';
import { connect } from "react-redux";
import { ICoinState } from '../../../store/interfaces/ICoinState';
import { LoadPopularCoins, GetCategories, GetCoinsByCategories, CoinsLoading } from '../../../store/action-creators/action-creator';
import { Coin, CoinCategory, CoinByCategory } from '../../../store/types';

interface IContent {
    isYoutubeClientLoaded: boolean;
    coins: Coin[];
    coinsByCategories: CoinByCategory;
    categories: CoinCategory[];
    coinsLoading: boolean;
    LoadPopularCoins(): void;
    LoadCategories(): void;
    SetCoinsLoading(): void;
    LoadCoinsByCategories(categories: CoinCategory[]): void;
}

const Content = (props: IContent) => {

    const grid = <Grid coins={props.coins} title="Recommended" showDivider />;

    const categoriesName = Object.keys(props.coinsByCategories);

    const gridByCategories = categoriesName.map((key: string, index: number) => {

        let showDivider: boolean = (index !== categoriesName.length - 1)

        return <Grid key={key} coins={props.coinsByCategories[key]} title={key} showDivider={showDivider} />
    });

    const [categoryIndex, setCategoryIndex] = useState(0);

    if (categoryIndex == 0 && props.categories && props.categories.length > 0) {
        props.SetCoinsLoading();
        props.LoadCoinsByCategories([props.categories[categoryIndex]]);
        setCategoryIndex((currentIndex: number) => currentIndex += 1);
    }

    const onCallBack = () => {
        let categoriesToFetch: CoinCategory[] = props.categories.slice(categoryIndex, categoryIndex + 2);
        props.SetCoinsLoading();
        props.LoadCoinsByCategories(categoriesToFetch);
        setCategoryIndex((currentIndex: number) => currentIndex += 2);
    }

    useEffect(() => {
        if (props.isYoutubeClientLoaded) {
            props.LoadPopularCoins();
            props.LoadCategories();
        }
    }, [props.isYoutubeClientLoaded])

    return <InfiniteScroll callBack={onCallBack} isLoading={props.coinsLoading}><div className="content">
        <div className="content_container">
            {grid}
            {gridByCategories}
        </div>
    </div>
    </InfiniteScroll>
}

const mapStateToProps = (state: ICoinState) => {
    return {
        isYoutubeClientLoaded: state.isYoutubeClientLoaded,
        coins: state.coins,
        categories: state.categories,
        coinsByCategories: state.coinsByCategories,
        coinsLoading: state.coinsLoading
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        LoadPopularCoins: () => dispatch(LoadPopularCoins()),
        LoadCategories: () => dispatch(GetCategories()),
        LoadCoinsByCategories: (categories: CoinCategory[]) => dispatch(GetCoinsByCategories(categories)),
        SetCoinsLoading: () => dispatch(CoinsLoading())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Content)