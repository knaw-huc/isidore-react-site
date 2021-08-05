import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate, ISortFacetValue} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function PageDimensionsFacet(props: {add: ISendCandidate, search: ISearchObject, refresh: boolean}) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/page_dimensions/"  + Base64.toBase64(JSON.stringify(props.search)) + "/normal";
    const [help, setHelp] = useState(false);
    const facetValues: ISortFacetValue[] = [
        {facetValue: "< 300 mm", amount: 0},
        {facetValue: "300-350 mm", amount: 0},
        {facetValue: "351-400 mm", amount: 0},
        {facetValue: "401-450 mm", amount: 0},
        {facetValue: "451-500 mm", amount: 0},
        {facetValue: "501-550 mm", amount: 0},
        {facetValue: "551-600 mm", amount: 0},
        {facetValue: "601-650 mm", amount: 0},
        {facetValue: "> 651 mm", amount: 0},
        {facetValue: "Unknown", amount: 0}
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
            { help &&
            <div className="hcFacetHelp"  onClick={() => setHelp(false)}>
                <p><strong>Page dimensions</strong></p>
                <p>The page dimensions of manuscripts in the database are represented by a single value, the <i>taille</i> (page height + page width).</p> <p>Manuscripts are then assigned to several size categories. For example, a manuscript with a page of 325 x 210 mm, that is with a taille of 535 mm, would appear in this overview in the category of 500-550 mm.</p>
                <p>In the case of manuscripts with pages of varying size, the values taken are minimum page height + minimum page width.</p>
            </div> }
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {facetValues.map((item, index) => {
                        if (item.amount > 0) {
                            return (<div key={index} className="hcFacetItem" onClick={() => props.add({
                                facet: "Page dimensions",
                                field: "page_dimensions",
                                candidate: item.facetValue
                            })}>
                                <div className="checkBoxLabel"> {item.facetValue}
                                    <div className="facetAmount"> ({item.amount})</div>
                                </div>
                            </div>);
                        }
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default PageDimensionsFacet;