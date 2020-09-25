import React from "react";
import {useState, useEffect} from "react";


function SearchFreetext() {
    const port: string = 'Home';
    const [help, setHelp] = useState(false);
    const [count, setCount] = useState(0);


    function sendCandidate(value: string) {
        let header: string = "Home port big region";
        let field: string = "plaats_regio_groot";
    }




    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
Free text search

            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetItems">
                <input className="hcFacetSearch" placeholder="Type text for free text search"/>
            </div>
        </div>
    );

}

export default SearchFreetext;