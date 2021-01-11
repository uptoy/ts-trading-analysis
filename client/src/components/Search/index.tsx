import React, { useEffect } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import { params, SearchResult, SearchListResponse, Coin } from '../../store/types';
import { getParamValue } from '../../utils/uri';
import { connect } from 'react-redux';
import { ICoinState } from '../../store/interfaces/ICoinState';
import { SearchCoins, CoinsLoading, ClearSearchResult } from '../../store/action-creators';
import { ResultList } from './ResultList';

interface ISearch extends RouteComponentProps<params> {
    searchResults: SearchListResponse;
    isLoading: boolean;
    youtubeClientLoaded: boolean;
    searchCoin(query: string, nextPageToken: string | null): void;
    setCoinLoading() : void,
    clearResults() : void
}

const Search = (props: ISearch)=> {

    console.log(JSON.stringify(props.searchResults));

    const coins: [] = props.searchResults.items?.map((item: { id: { coinId:string; }; }) => ({ ...item, id: item.id?.coinId })) || [];

    const userQuery: string | null = getParamValue(props.location, 'search_query')

    const callBack = () => {
        if (props.CoinClientLoaded && userQuery && props.searchResults.nextPageToken) {
            props.setCoinLoading();
            props.searchCoin(userQuery, props.searchResults.nextPageToken!)
        }
    }

    useEffect(() => {
        if (props.youtubeClientLoaded && userQuery) {
            props.clearResults();
            props.setCoinLoading();
            props.searchCoin(userQuery, null)
        }
    }, [props.youtubeClientLoaded, userQuery])

    return <ResultList callBack={callBack} isLoading={props.isLoading} coins={coins} />
}

const mapStateToProps = (state: ICoinState) => {
    return {
        searchResults: state.searchResults,
        youtubeClientLoaded: state.isYoutubeClientLoaded,
        isLoading: state.coinsLoading,
    }
}

const mapDispatchToProps = (dispatch: any) => {
    return {
        searchCoin: (query: string, nextPageToken: string | null) => dispatch(SearchCoins(query, nextPageToken)),
        setCoinLoading : () => dispatch(CoinsLoading()),
        clearResults : () => dispatch(ClearSearchResult())
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Search));