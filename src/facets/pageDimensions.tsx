import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function PageDimensionsFacet(props: {add: ISendCandidate}) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/page_dimensions/normal";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="hcFacet">
            { help &&
            <div className="hcFacetHelp">
                <strong>Page dimensions facet</strong><br/>
                Select one or more ranges.
            </div> }
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({facet: "Page dimensions", field: "page_dimensions", candidate: item.key})}><div className="checkBoxLabel"> {item.key} <div className="facetAmount"> ({item.doc_count})</div></div></div>);
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