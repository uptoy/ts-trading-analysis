import React from 'react'
import './GridHeader.css'

interface IGridHeader {
    Title: string;
}

export const GridHeader = (props: IGridHeader) => {
    return <div className= "grid_header">
        <span className ="title">{props.Title}</span>
    </div>
}