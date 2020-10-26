import React from "react";
import {useState, useEffect} from "react";


function FiltersFacet() {
    const port: string = 'Home';
    const [help, setHelp] = useState(false);
    const [count, setCount] = useState(0);


    function sendCandidate(value: string) {
        let header: string = "Home port big region";
        let field: string = "plaats_regio_groot";
    }




    return (
        <div className="hcFacet">
            {/*<div className="hcFacetTitle">
                Absolute place
            </div>*/}
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetItems">
                <div><input type="checkbox"/> Annotations (68)</div>
                <div><input type="checkbox"/> Digitized (99)</div>
                <div><input type="checkbox"/> Part larger collection (99)</div>
                <div><input type="checkbox"/> Full <i>Etymologiae</i> (99)</div>

            </div>

        </div>
    );

}

export default FiltersFacet;