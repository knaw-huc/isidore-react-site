import React from "react";
import {useState, useEffect} from "react";


function FullEtyFacet() {
    const [help, setHelp] = useState(false);
    const [count, setCount] = useState(0);


    function sendCandidate(value: string) {
        let header: string = "Home port big region";
        let field: string = "plaats_regio_groot";
    }




    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                Exclude full<br/>
                <i>Etymologiae</i>
            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Full Etymologiae</strong><br/>
                Select yes or no.
            </div> }
            <div className="hcFacetItems">
                <select>
                    <option value="no">No</option>
                    <option value="yes">Yes</option>
                </select>
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default FullEtyFacet;