import React from "react";
import {useState, useEffect} from "react";
import {ISendCandidate} from "../misc/interfaces";


function FiltersFacet(props: { add: ISendCandidate }) {


    return (
        <div className="hcFacet">
            <div className="hcFacetItems">
                <div>Annotations <div className="facetAmount">(68)</div></div>
                <div>Digitized <div className="facetAmount">(99)</div></div>
                <div>Part larger collection <div className="facetAmount">(99)</div></div>
                <div>Exclude full <i>Etymologiae</i><div className="facetAmount"> (339)</div>
                </div>

            </div>

        </div>
    );

}

export default FiltersFacet;