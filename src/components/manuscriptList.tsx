import React from "react";
import {useState, useEffect} from "react";
import {IResultManuscript, IResultManuscriptList, ISearchObject} from "../misc/interfaces";
import ManuscriptResultItem from "../elements/manuscriptResultItem";


export default function ManuscriptList(props: {result: IResultManuscriptList}) {

    return (
        <div>{
            props.result.manuscripts.map((item: IResultManuscript) => {
              return  (<ManuscriptResultItem item={item}/>)})}</div>
    )
}