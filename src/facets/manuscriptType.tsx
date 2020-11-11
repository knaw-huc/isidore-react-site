import React from "react";
import {useState, useEffect} from "react";
import {facetList} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";

function ManuscriptTypeFacet() {

    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/content_type/normal";
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
            {help &&
            <div className="hcFacetHelp">
                <strong>Script</strong><br/>
                Select one or more states.
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="checkBoxItem"><input type="checkbox"/><div className="checkBoxLabel"> {item.key} <div className="facetAmount">({item.doc_count})</div></div></div>);
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
        </div>
    );
}

export default ManuscriptTypeFacet;