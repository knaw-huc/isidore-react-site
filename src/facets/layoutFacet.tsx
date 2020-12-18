import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function LayoutFacet(props: {add: ISendCandidate, search: ISearchObject, refresh: boolean }) {

    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/layout/"  + Base64.toBase64(JSON.stringify(props.search)) + "/normal";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, [props.refresh]);

    return (
        <div className="hcFacet">
            {help &&
            <div className="hcFacetHelp">
                <strong>Script</strong><br/>
                Select one or more states.
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({facet: "Layout", field: "layout", candidate: item.key})}><div className="checkBoxLabel"> {item.key} <div className="facetAmount">({item.doc_count})</div></div></div>);
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
        </div>
    );
}

export default LayoutFacet;