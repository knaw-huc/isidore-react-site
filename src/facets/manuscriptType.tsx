import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function ManuscriptTypeFacet(props: {add: ISendCandidate, search: ISearchObject, refresh: boolean}) {

    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/content_type/"  + Base64.toBase64(JSON.stringify(props.search)) + "/normal";
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
                <p><strong>Manuscript type</strong></p>
                <p>Refers to the character of manuscripts transmitting the <i>Etymologiae</i>. Manuscripts transmitting only the <i>Etymologiae</i> are designated as <strong>Big Isidores</strong>. Other manuscripts are assigned to a category based on a notable thematic profile. Not all texts found in these manuscripts must fit this profile, but the majority does. Manuscripts that do not fit into any of the profiles are classified as <strong>miscellanies</strong>. In case the thematic design of a manuscript cannot be established due to its fragmentary preservation, it is labelled as <strong>unknown</strong>.</p>
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({facet: "Manuscript type", field: "content_type", candidate: item.key})}><div className="checkBoxLabel"> {item.key} <div className="facetAmount">({item.doc_count})</div></div></div>);
                    })}
                </div>) : (<div>Loading...</div>)}
                <div>
                </div>
            </div>
        </div>
    );
}

export default ManuscriptTypeFacet;