import React from "react";
import {useState, useEffect} from "react";
import {IResultManuscript} from "../misc/interfaces";
import ManuscriptResultItem from "../elements/manuscriptResultItem";

export default function ManuscriptList() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IResultManuscript[]>([]);

    async function fetchData() {
        const url = "http://www.huc.localhost/isidore_service/dummy";
        const response = await fetch(url);
        const json: IResultManuscript[]  = await response.json();
        setResult(json);
        setLoading(false);
        console.log("OK");
    }

    if (loading) {
        fetchData();
    }


    return (
        <div>{loading ? ("Loading...") : (
            result.map((item: IResultManuscript) => {
              return  (<ManuscriptResultItem item={item}/>)
            }))}</div>
    )
}