//ok

import React from 'react';
import { Image } from 'semantic-ui-react';
import './Preview.css'
import { Coin, params } from '../../../../../store/types';
import { formatShortString } from '../../../../../utils/number';
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import { formatTimeString } from '../../../../../utils/timeformat';
import { RouteComponentProps, withRouter } from 'react-router-dom';

TimeAgo.addLocale(en);

const timeAgo: TimeAgo = new TimeAgo();

interface IPreview extends RouteComponentProps<params> {
    coin: Coin;
    isVertical?: boolean;
}

export const Preview = withRouter((props: IPreview) => {
    const infoClass: string = (props.isVertical) ? 'verticalList' : 'info';
    return <div className="preview">
        <div className="image" onClick={() => props.history.push(`/watch?v=${props.coin.id}`)}>
            <Image src={props.coin.snippet?.thumbnails?.medium?.url} />
            <div className="timestamp">
                <span>{(!props.coin.contentDetails) ? null : formatTimeString(props.coin.contentDetails?.duration!)}</span>
            </div>
        </div>
        <div className={infoClass}>
            <div className="info_title">{props.coin.snippet?.title}</div>
            <div className="basic_info">
                <div className="channel">{props.coin.snippet?.channelTitle}</div>
                <div className="view_time">{(!props.coin.statistics) ? null : (`${formatShortString(props.coin.statistics?.viewCount!)} views • ${timeAgo.format(new Date(props.video.snippet?.publishedAt!))}`)}</div>
                {props.isVertical && <div className="info_title">{props.coin.snippet?.description}</div>}
            </div>
        </div>

    </div>
})