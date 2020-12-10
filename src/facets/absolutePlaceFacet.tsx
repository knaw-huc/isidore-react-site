import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function AbsolutePlaceFacet(props: { add: ISendCandidate }) {
    let [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/absolute_places.place_absolute/short";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        if (more) {
            url = SERVICE_SERVER + "elastic/nested_facet/absolute_places.place_absolute/short/" + filter;
        } else {
            url = SERVICE_SERVER + "elastic/nested_facet/absolute_places.place_absolute/long/" + filter;
        }

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }


    function changeListLength() {
        if (more) {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/nested_facet/absolute_places.place_absolute/short";
            } else {
                url = SERVICE_SERVER + "elastic/nested_facet/absolute_places.place_absolute/short/" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/initial_facet/absolute_places.place_absolute/long";
            } else {
                url = SERVICE_SERVER + "elastic/facet/absolute_places.place_absolute/long/" + filter;
            }
            setMore(true);
        }
    }


    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        setFilter(e.currentTarget.value);
    }

    useEffect(() => {
        fetchData();
    }, [filter, more]);


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

export default AbsolutePlaceFacet;