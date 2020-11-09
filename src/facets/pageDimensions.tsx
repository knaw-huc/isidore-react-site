import React from "react";
import {useState, useEffect} from "react";


function PageDimensionsFacet() {
    const [help, setHelp] = useState(false);
    const [count, setCount] = useState(0);


    function sendCandidate(value: string) {
        let header: string = "Home port big region";
        let field: string = "plaats_regio_groot";
    }




    return (
        <div className="hcFacet">
            { help &&
            <div className="hcFacetHelp">
                <strong>Page dimensions facet</strong><br/>
                Select one or more ranges.
            </div> }
            <div className="hcFacetItems">
                <div><input type="checkbox"/>&lt; 300 mm <div className="facetAmount">(16)</div></div>
                <div><input type="checkbox"/>300-350 mm <div className="facetAmount">(40)</div></div>
                <div><input type="checkbox"/>351-400 mm <div className="facetAmount">(65)</div></div>
                <div><input type="checkbox"/>401-450 mm <div className="facetAmount">(76)</div></div>
                <div><input type="checkbox"/>451-500 mm <div className="facetAmount">(83)</div></div>
                <div><input type="checkbox"/>501-550 mm <div className="facetAmount">(67)</div></div>
                <div><input type="checkbox"/>551-600 mm <div className="facetAmount">(51)</div></div>
                <div><input type="checkbox"/>601-650 mm <div className="facetAmount">(26)</div></div>
                <div><input type="checkbox"/>&gt; 650 mm <div className="facetAmount">(12)</div></div>
                <div><input type="checkbox"/>unknown <div className="facetAmount">(11)</div></div>
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default PageDimensionsFacet;