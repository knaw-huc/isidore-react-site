import React from "react";
import {useState, useEffect} from "react";
import {ISendCandidate, ISearchObject} from "../misc/interfaces";


function SearchFreetext(props: { add: ISendCandidate }) {
    const [textField, setTextField] = useState<string>("");
    const [help, setHelp] = useState(false);

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
            {!help && <span className="hcIconHelp" onClick={() => setHelp(true)}><img
                src="https://d33wubrfki0l68.cloudfront.net/85886ca3e2d8c36ba06d7773a094512272453181/545f8/images/icons/icon-huc-help.svg"
                alt=""/></span>}
            {help &&
            <div className="hcFacetHelp" onClick={() => setHelp(false)}>
                <p><strong>Search</strong></p>
                <p>A free text search of all of the data in the dataset</p>
            </div>}
            <div className="hcFacetTitle">
                Free text search
            </div>
            <div className="hcFacetItems">
                <input className="hcFacetSearch" defaultValue={textField} placeholder="Type text to search"
                       onChange={handleChange}/>
            </div>
            <button className="ftSearchBtn" onClick={setTextFacet}>Search</button>
        </div>
    );

}

export default SearchFreetext;