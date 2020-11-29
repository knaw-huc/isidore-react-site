import React from "react";
import {useState, useEffect} from "react";
import slider from "../assets/img/slider.png";



function DummySliderFacet() {
    const [help, setHelp] = useState(false);



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
                <img className="sliderImg" src={slider}/>
            </div>
            (This facet isn't active yet.)
            {/*<div className="hcClickable" >
                { true ? (<div>More...</div>) : (<div>Less...</div>)}
            </div>*/}
        </div>
    );

}

export default DummySliderFacet;