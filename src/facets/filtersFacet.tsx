import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function FiltersFacet(props: { add: ISendCandidate }) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/filter_facets/dummy";

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
            <div className="hcFacetItems">
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Annotations",
                    field: "annotations",
                    candidate: "yes"
                })}>Annotations&nbsp;<div className="facetAmount"> (68)</div></div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Digitized",
                    field: "digitized",
                    candidate: "yes"
                })}>Digitized&nbsp; <div className="facetAmount"> (306)</div></div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Part larger collection",
                    field: "part",
                    candidate: "yes"
                })}>Part larger collection<div className="facetAmount">(69)</div></div>
                <div className="hcFacetItem" onClick={() => props.add({
                    facet: "Exclude full Etymologiae",
                    field: "excluded",
                    candidate: "yes"
                })}>Exclude full <div className="facetAmount">&nbsp; (108)</div>
                </div>

            </div>

        </div>
    );

}

export default FiltersFacet;