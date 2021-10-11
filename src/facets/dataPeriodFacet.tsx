import React from "react";
import {useState, useEffect} from "react";
import slider from "../assets/img/slider.png";
import {facetList, ISendCandidate} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";


function DatePeriodFacet(props: { add: ISendCandidate }) {
    const [data, setData] = useState<facetList>({"buckets": []});
    const [loading, setLoading] = useState(true);
    let url: string = SERVICE_SERVER + "elastic/nested_facet/?f=scaled_dates.numerical_date&l=normal";
    const [help, setHelp] = useState(false);

    async function fetchData() {
        const response = await fetch(url);
        const json = await response.json();
        setData(json);
        setLoading(false);
    }

    useEffect(() => {
        fetchData();
    }, []);

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                Date numerical
            </div>
            { help &&
            <div className="hcFacetHelp">

            </div> }
            <div className="hcFacetItems">
                {!loading ? (<div>
                    {data.buckets.map((item, index) => {
                        return (<div key={index} className="hcFacetItem" onClick={() => props.add({
                            facet: "Numerical date",
                            field: "scaled_dates.numerical_date",
                            candidate: item.key
                        })}>
                            <div className="checkBoxLabel"> {item.key}
                                <div className="facetAmount"> ({item.doc_count})</div>
                            </div>
                        </div>);
                    })}
                </div>) : (<div>Loading...</div>)}
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default DatePeriodFacet;