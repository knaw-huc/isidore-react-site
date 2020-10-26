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
                Absolute place
            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetFilter"><input type="text" name="" placeholder="Type to filter"/></div>
            <div className="hcFacetItems">
                <div className="hcFacetItem">Albelda (1)</div>
                <div className="hcFacetItem">Albi (1)</div>
                <div className="hcFacetItem">Alemannia (1)</div>
                <div className="hcFacetItem">Alsace (1)</div>
                <div className="hcFacetItem">Amiens (1)</div>
            </div>
            <div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>
        </div>
    );

}

export default GeoNameFacet;