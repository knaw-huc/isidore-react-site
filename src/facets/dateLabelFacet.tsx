import React from "react";
import {useState, useEffect} from "react";


function DatelabelFacet() {
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
                Date scaled
            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetItems">
                <div><input type="checkbox"/>7th c. (1)</div>
                <div><input type="checkbox"/>7th c., 2/2 (1)</div>
                <div><input type="checkbox"/>8th c. (1)</div>
                <div><input type="checkbox"/>8th c., 1/2 (4)</div>
                <div><input type="checkbox"/>9th c. (17)</div>
                <div><input type="checkbox"/>9th c., 1/2 (157)</div>
                <div><input type="checkbox"/>9th c., 2/2 (127)</div>
                <div><input type="checkbox"/>10th c. (32)</div>
                <div><input type="checkbox"/>10th c. 1/2 (26)</div>
                <div><input type="checkbox"/>10th c. 2/2 (14)</div>
                <div><input type="checkbox"/>11th c. (4)</div>
                <div><input type="checkbox"/>11th c. 1/2 (40)</div>
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default DatelabelFacet;