import React from "react";
import {useState, useEffect} from "react";
import {ISendCandidate, ISearchObject} from "../misc/interfaces";


function SearchFreetext(props: {add: ISendCandidate}) {
    const [textField, setTextField] = useState<string>("");

    function handleChange(e: React.FormEvent<HTMLInputElement>): void {
        setTextField(e.currentTarget.value);
    }

    function setTextFacet() {
        if (textField !== "") {
            props.add({facet: "Free text", field: "FREE_TEXT", candidate: textField});
        }
    }


    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                Free text search
            </div>
            <div className="hcFacetItems">
                <input className="hcFacetSearch" defaultValue={textField} placeholder="Type text to search" onChange={handleChange}/>
            </div>
            <button className="ftSearchBtn" onClick={setTextFacet}>Search</button>
        </div>
    );

}

export default SearchFreetext;