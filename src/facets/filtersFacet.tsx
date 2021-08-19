import React from "react";
import {useState, useEffect} from "react";
import {filterNumbers, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";


function FiltersFacet(props: { add: ISendCandidate, search: ISearchObject, refresh: boolean }) {
    const [data, setData] = useState<filterNumbers>({annotations: 0, digitized: 0, excluded: 0, part: 0});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/filter_facets/" + Base64.toBase64(JSON.stringify(props.search));

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
            {loading ? (<div>Loading...</div>) : (<div className="hcFacetItems">
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Annotations",
                    field: "annotations",
                    candidate: "yes"
                })}>Annotations&nbsp;
                    <div className="facetAmount"> ({data.annotations})</div>
                </div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Digitized",
                    field: "digitized",
                    candidate: "yes"
                })}>Digitized&nbsp;
                    <div className="facetAmount"> ({data.digitized})</div>
                </div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Part larger collection",
                    field: "part",
                    candidate: "yes"
                })}>Part larger collection
                    <div className="facetAmount">({data.excluded})</div>
                </div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Exclude full Etymologiae",
                    field: "excluded",
                    candidate: "yes"
                })}>Exclude full <div className="facetAmount">&nbsp; ({data.part})</div>
                </div>

            </div>)}
        </div>
    );

}

export default FiltersFacet;