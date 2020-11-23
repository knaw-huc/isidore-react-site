import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function CurrentPlaceFacet(props: {add: ISendCandidate}) {
    let [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/current_places.place/short";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        if (more) {
            url = SERVICE_SERVER + "elastic/nested_facet/current_places.place/short/" + filter;
        } else {
            url = SERVICE_SERVER + "elastic/nested_facet/current_places.place/long/" + filter;
        }

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }


    function changeListLength() {
        if (more) {
            if (filter === "") {
                url= SERVICE_SERVER + "elastic/nested_facet/current_places.place/short";
            } else {
                url= SERVICE_SERVER + "elastic/nested_facet/autcurrent_placeshors.place/short/" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url= SERVICE_SERVER + "elastic/initial_facet/current_places.place/long";
            } else {
                url= SERVICE_SERVER + "elastic/facet/current_places.place/long/" + filter;
            }
            setMore(true);
        }
    }


    function handleChange(e: React.FormEvent<HTMLInputElement>) {
        if (e.currentTarget.value.length > 1)
        {
            setFilter(e.currentTarget.value);
        }
    }

    useEffect(() => {
        fetchData();
    }, [filter, more]);


    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">

            </div>
            <div>
                {help ? (<div className="hcFacetHelp">
                    <strong>The full name facet </strong><br/>
                    The names of the shipmasters are ordered by their number of passages. Filtering this facet is based on <u>family name</u>.
                </div>) : (<div/>)}

            </div>
            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter" placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.buckets.map((item) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.add({facet: "Current places", field: "current_places.place", candidate: item.key})}>
                                <div className="checkBoxItem"> {item.key} <div className="facetAmount">({item.doc_count})</div></div>
                            </div>
                        )
                    })}


                    <div className="hcClickable" onClick={changeListLength}>
                        { more ? (<div>More...</div>) : (<div>Less...</div>)}
                    </div>
                </div>) :
                (<div className="hcFacetLoading">Loading...</div>)}
        </div>
    );

}

export default CurrentPlaceFacet;