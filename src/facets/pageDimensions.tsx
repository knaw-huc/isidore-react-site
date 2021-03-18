import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function PageDimensionsFacet(props: {add: ISendCandidate, search: ISearchObject, refresh: boolean}) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/initial_facet/page_dimensions/"  + Base64.toBase64(JSON.stringify(props.search)) + "/normal";
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
            { help &&
            <div className="hcFacetHelp"  onClick={() => setHelp(false)}>
                <p><strong>Page dimensions</strong></p>
                <p>The page dimensions of manuscripts in the database are represented by a single value, the <i>taille</i> (page height + page width).</p> <p>Manuscripts are then assigned to several size categories. For example, a manuscript with a page of 325 x 210 mm, that is with a taille of 535 mm, would appear in this overview in the category of 500-550 mm.</p>
                <p>In the case of manuscripts with pages of varying size, the values taken are minimum page height + minimum page width.</p>
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