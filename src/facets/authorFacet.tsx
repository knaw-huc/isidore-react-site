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
            <div>
                { !help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                    src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                    alt=""/></span>}
                {help ? (<div className="hcFacetHelp" onClick={() => setHelp(false)}>
                    <p><strong>Author/text/types</strong></p>
                    <p>This facet allows you to search for the works of known authors, anonymous texts, and short compositions on specific subjects that appear in the same manuscript as the <i>Etymologiae</i> (BUT it does not include systematically the texts interpolated into the <i>Etymologiae</i> – for these a separate facet may be established in the future).</p>
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

export default AuthorFacet;