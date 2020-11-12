import React from "react";
import {useState, useEffect} from "react";


function GeoNameFacet() {
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
                Modern place

            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetItems">
                <div><input type="checkbox"/> France <div className="facetAmount">(54)</div></div>
                <div><input type="checkbox"/> Germany <div className="facetAmount">(29)</div></div>
                <div><input type="checkbox"/> Italy <div className="facetAmount">(19)</div></div>
                <div><input type="checkbox"/> Spain <div className="facetAmount">(11)</div></div>
                <div><input type="checkbox"/> Switzerland <div className="facetAmount">(7)</div></div>
                <div><input type="checkbox"/> United kingdom <div className="facetAmount">(5)</div></div>
                <div><input type="checkbox"/> Unknown <div className="facetAmount">(3)</div></div>
                <div><input type="checkbox"/> Ireland <div className="facetAmount">(1)</div></div>
                <div><input type="checkbox"/> Austria <div className="facetAmount">(1)</div></div>
                <div><input type="checkbox"/> Belgium <div className="facetAmount">(1)</div></div>
            </div>
        </div>
    );

}

export default GeoNameFacet;