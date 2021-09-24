import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate, ISortFacetValue} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function LayoutFacet(props: {add: ISendCandidate, search: ISearchObject, refresh: boolean }) {

    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/?f=layout&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=normal";
    const [help, setHelp] = useState(false);
    const facetValues: ISortFacetValue[] = [
        {facetValue: "one column", amount: 0},
        {facetValue: "two columns", amount: 0},
        {facetValue: "three columns", amount: 0},
        {facetValue: "four columns", amount: 0},
        {facetValue: "unknown", amount: 0}
    ];

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    if (!loading) {
        data.buckets.map((item) => {
            let waarde = (element: ISortFacetValue) => element.facetValue === item.key;
            let i: number = facetValues.findIndex(waarde);
            facetValues[i].amount = item.doc_count;
        })
    }

    useEffect(() => {
        fetchData();
    }, [props.refresh]);

    return (
        <div className="hcFacet">
            { !help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                alt=""/></span>}
            {help &&
            <div className="hcFacetHelp"  onClick={() => setHelp(false)}>
                <p><strong>Layout</strong></p>
                <p>The layout of the text in the writing window.</p>
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {facetValues.map((item, index) => {
                        if (item.amount > 0) {
                            return (<div key={index} className="hcFacetItem" onClick={() => props.add({facet: "Layout", field: "layout", candidate: item.facetValue})}><div className="checkBoxLabel"> {item.facetValue} <div className="facetAmount">({item.amount})</div></div></div>);
                        }
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
        </div>
    );
}

export default LayoutFacet;