import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";


function CurrentPlaceFacet(props: { add: ISendCandidate, search: ISearchObject, refresh: boolean }) {
    let [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/current_places.place/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        if (more) {
            url = SERVICE_SERVER + "elastic/nested_facet/current_places.place/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short/" + filter;
        } else {
            url = SERVICE_SERVER + "elastic/nested_facet/current_places.place/"  + Base64.toBase64(JSON.stringify(props.search)) + "/long/" + filter;
        }

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }


    function changeListLength() {
        if (more) {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/nested_facet/current_places.place/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short";
            } else {
                url = SERVICE_SERVER + "elastic/nested_facet/autcurrent_placeshors.place/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short/" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/initial_facet/current_places.place/long";
            } else {
                url = SERVICE_SERVER + "elastic/facet/current_places.place/long/" + filter;
            }
            setMore(true);
        }
    }


    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setFilter(e.currentTarget.value);
    }

    useEffect(() => {
        fetchData();
    }, [filter, more, props.refresh]);


    return (
        <div className="hcFacet">
            { !help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                alt=""/></span>}
                {help ? (<div className="hcFacetHelp"  onClick={() => setHelp(false)}>
                    <p><strong>Current place</strong></p>
                    <p>The city of the current preservation of a manuscript</p>
                </div>) : (<div/>)}

            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter"
                                                  placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.buckets.map((item) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.add({
                                facet: "Current places",
                                field: "current_places.place",
                                candidate: item.key
                            })}>
                                <div className="checkBoxItem"> {item.key}
                                    <div className="facetAmount">({item.doc_count})</div>
                                </div>
                            </div>
                        )
                    })}


                    <div className="hcClickable" onClick={changeListLength}>
                        {more ? (<div>More...</div>) : (<div>Less...</div>)}
                    </div>
                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
        </div>
    );

}

export default CurrentPlaceFacet;