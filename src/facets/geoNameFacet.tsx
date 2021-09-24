import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";


function GeoNameFacet(props: { add: ISendCandidate, search: ISearchObject, refresh: boolean }) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.country&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=normal";
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
            { !help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                alt=""/></span>}
            {help &&
            <div className="hcFacetHelp" onClick={() => setHelp(false)}>
                <p><strong>Place of origin</strong></p>
                <p>Modern places of origin correspond to current states. Specific places correspond to the various medieval locations (e.g. Reims), areas (e.g. Bodensee area), or wider regions (e.g. northern France) identified in manuscript catalogues.</p>
            </div>}
            <div className="hcFacetTitle">
                Modern place
            </div>
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({
                            facet: "Modern place",
                            field: "absolute_places.country",
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

export default GeoNameFacet;