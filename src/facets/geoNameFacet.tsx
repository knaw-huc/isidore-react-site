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
                <div><input type="checkbox"/> France (54)</div>
                <div><input type="checkbox"/> Germany (29)</div>
                <div><input type="checkbox"/> Italy (19)</div>
                <div><input type="checkbox"/> Spain (11)</div>
                <div><input type="checkbox"/> Switzerland (7)</div>
                <div><input type="checkbox"/> United kingdom (5)</div>
                <div><input type="checkbox"/> Unknown (3)</div>
                <div><input type="checkbox"/> Ireland (1)</div>
                <div><input type="checkbox"/> Austria (1)</div>
                <div><input type="checkbox"/> Belgium (1)</div>
            </div>
        </div>
    );

}

export default GeoNameFacet;