import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";

function AbsolutePlaceFacet(props: { add: ISendCandidate, search: ISearchObject, refresh: boolean }) {
    let [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=short";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        if (more) {
            url = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=short&s=" + filter;
        } else {
            url = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=long&s=" + filter;
        }

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }


    function changeListLength() {
        if (more) {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=short";
            } else {
                url = SERVICE_SERVER + "elastic/nested_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=short&s=" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/initial_facet/?f=absolute_places.place_absolute&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&l=long";
            } else {
                url = SERVICE_SERVER + "elastic/facet/?f=absolute_places.place_absolute&l=long/&q="  + Base64.toBase64(JSON.stringify(props.search)) + "&s=" + filter;
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
            <div className="hcFacetTitle">
                Absolute place
            </div>
            {help &&
            <div className="hcFacetHelp">
                <strong>Absolute place facet</strong><br/>
                Type text and complete with ENTER.
            </div>}
            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange}
                                                  placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.buckets.map((item) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.add({
                                facet: "Absolute place",
                                field: "absolute_places.place_absolute",
                                candidate: item.key
                            })}>
                                <div className="checkBoxItem"> {item.key}
                                    <div className="facetAmount"> ({item.doc_count})</div>
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

export default AbsolutePlaceFacet;