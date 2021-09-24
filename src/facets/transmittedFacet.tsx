import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function TransmittedFacet(props: { add: ISendCandidate, search: ISearchObject, refresh: boolean }) {

    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/?f=material_types.material_type&q=" + Base64.toBase64(JSON.stringify(props.search)) + "&l=normal";
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
            {!help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                alt=""/></span>}
            {help &&
            <div className="hcFacetHelp" onClick={() => setHelp(false)}>
                <p><strong>Etym. transmitted as:</strong></p>
                <p>Refers to the medieval design of the manuscripts (in contrast to the current state of preservation).
                    Not all manuscripts included in the database transmit the text as it was structured by Braulio of
                    Zaragoza (full). Many contain only excerpts from the entire work (single excerpt, multiple excerpts,
                    excerpt sequence), a specific abridgement of or selection from the <i>Etymologiae</i> (epitome, book
                    sequence), or a notable derivate of the encyclopaedia transmitted as novel textual compilations or
                    self-standing text (excerpt collection, book, book section, book). The label 'not full' applies to
                    fragments that cannot represent a remnant of an encyclopaedic copy of the <i>Etymologiae</i> but
                    whose transmission format cannot be established more precisely.</p>
            </div>}
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({
                            facet: "Etymology transmitted as",
                            field: "material_types.material_type",
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

export default TransmittedFacet;