import React from 'react';
import { Preview } from './Preview' ;
import { Divider } from 'semantic-ui-react'

import './Grid.css'
import { GridHeader } from './GridHeader';
import { Coin } from '../../../../store/types';

interface ICoins {
    coins: Coin[];
    title: string;
    showDivider: boolean;
}


export const Grid = (props: ICoins) => {

    let previews = props.coins.map((coin) => <Preview coin={coin} key={coin.id} />);
    return <>
        <GridHeader Title={props.title}></GridHeader>
        <div className="grid">{previews}
        </div>
        {props.showDivider ? <Divider /> : null}
    </>
}