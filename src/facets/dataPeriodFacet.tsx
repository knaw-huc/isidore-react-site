import React from "react";
import {useState, useEffect} from "react";
import slider from "../assets/img/slider.png";


function DatePeriodFacet() {
    const port: string = 'Home';
    const [help, setHelp] = useState(false);
    const [count, setCount] = useState(0);


    function sendCandidate(value: string) {
        let header: string = "Home port big region";
        let field: string = "plaats_regio_groot";
    }

    const width: string = "100px";

    return (
        <div className="hcFacet">
            <div className="hcFacetTitle">
                Date numerical
            </div>
            { help &&
            <div className="hcFacetHelp">
                <strong>Free text facet</strong><br/>
                Type text and complete with ENTER.
            </div> }
            <div className="hcFacetItems">
                <div className="dateFrom">700 &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1100</div>
                <div className="slider"><img className="sliderImg" src={slider}/></div>
            </div>
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default DatePeriodFacet;