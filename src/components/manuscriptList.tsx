import React from "react";
import {useState, useEffect} from "react";
import {IResultManuscript, IResultManuscriptList} from "../misc/interfaces";
import ManuscriptResultItem from "../elements/manuscriptResultItem";

export default function ManuscriptList() {
    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IResultManuscriptList>({amount: 0, pages: 0, manuscripts: []});

    async function fetchData() {
        const url = "http://www.huc.localhost/isidore_service/search/eyJzZWFyY2h2YWx1ZXMiOiAibm9uZSIsICJwYWdlIjogIjEiLCAic29ydG9yZGVyIjogInNoZWxmbWFyayJ9";
        const response = await fetch(url);
        const json: IResultManuscriptList  = await response.json();
        setResult(json);
        setLoading(false);
    }
    if (loading) {
        fetchData();
    }


    return (
        <div>{loading ? ("Loading...") : (
            result.manuscripts.map((item: IResultManuscript) => {
              return  (<ManuscriptResultItem item={item}/>)
            }))}</div>
    )
}