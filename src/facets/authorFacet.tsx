import React from "react";
import {useState, useEffect} from "react";
import {facetList, ISearchObject} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {ISendCandidate} from "../misc/interfaces";
import {Base64} from "js-base64";

function AuthorFacet(props: { parentCallback: ISendCandidate, search: ISearchObject, refresh: boolean  }) {

    let [more, setMore] = useState(true);
    const [filter, setFilter] = useState("");
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        if (more) {
            url = SERVICE_SERVER + "elastic/nested_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short/" + filter;
        } else {
            url = SERVICE_SERVER + "elastic/nested_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/long/" + filter;
        }

        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }


    function changeListLength() {
        if (more) {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/nested_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short";
            } else {
                url = SERVICE_SERVER + "elastic/nested_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/short/" + filter;
            }
            setMore(false);
        } else {
            if (filter === "") {
                url = SERVICE_SERVER + "elastic/initial_facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/long";
            } else {
                url = SERVICE_SERVER + "elastic/facet/authors.author/"  + Base64.toBase64(JSON.stringify(props.search)) + "/long/" + filter;
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

            </div>
            <div>
                {help ? (<div className="hcFacetHelp">
                    <strong>The full name facet </strong><br/>
                    The names of the shipmasters are ordered by their number of passages. Filtering this facet is based
                    on <u>family name</u>.
                </div>) : (<div/>)}

            </div>
            <div className="hcFacetFilter"><input type="text" name="" onChange={handleChange} id="shipMasterFilter"
                                                  placeholder="Type to filter"/></div>
            {!loading ? (<div className="hcFacetItems">
                    {data.buckets.map((item) => {
                        return (
                            <div className="hcFacetItem" onClick={() => props.parentCallback({
                                facet: "Authors",
                                field: "authors.author",
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

export default AuthorFacet;