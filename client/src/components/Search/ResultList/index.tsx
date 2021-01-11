import React from 'react';
import { Coin } from '../../../store/types';
import { Preview } from '../../Home/Content/Grid/Preview';
import './ResultList.css'
import { InfiniteScroll } from '../../InfiniteScroll/InfiniteScroll.component';
import { Waypoint } from 'react-waypoint';

interface IResultList {
    coins: Coin[],
    callBack(args: Waypoint.CallbackArgs): void
    isLoading: boolean
}

export const ResultList = (props: IResultList) => {

    const previews = props.coins.map((item) => <Preview isVertical coin={item} key={item.id} />)

    return <div className="result_list">
        <InfiniteScroll callBack={props.callBack} isLoading={props.isLoading}>
            <div>
                {previews}
            </div>
        </InfiniteScroll>
    </div>
}