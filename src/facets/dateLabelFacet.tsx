import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function DatelabelFacet(props: { add: ISendCandidate }) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/scaled_dates.date/normal";
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
            <div className="hcFacetTitle">
                Date scaled
            </div>
            {help &&
            <div className="hcFacetHelp">
                <strong>Scaled date facet</strong><br/>
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({
                            facet: "Date scaled",
                            field: "scaled_dates.date",
                            candidate: item.key
                        })}>
                            <div className="checkBoxLabel"> {item.key}
                                <div className="facetAmount"> ({item.doc_count})</div>
                            </div>
                        </div>);
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>

        </div>
    );

}

export default DatelabelFacet;