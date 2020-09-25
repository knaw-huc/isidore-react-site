import React, {useEffect} from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import ManuscriptList from "./manuscriptList";
import {useState} from "react";
import SearchFreeText from "../facets/searchFreeText";
import GeoNameFacet from "../facets/geoNameFacet";


export default function Search() {
    const dummyFacets: boolean = false;
    const [searchFT, setSearchFT] = useState(false);
    const [geoFacet, setGeoFacet] = useState(false);

    return (
        <div>
            <Header/>
            <div className="hcContentContainer hcMarginBottom5">
                <div className="hcBasicSideMargin hcMarginTop1 hcMarginBottom5">
                    <h2>Search manuscripts</h2>

                    <div className="hcLayoutFacet-Result hcBasicSideMargin hcMarginBottom15">
                        <div className="hcLayoutFacets">
                            <button type="button" name="button" id="showFacets" className="hcfixedSideButton"><img
                                src="https://d33wubrfki0l68.cloudfront.net/191a405740a4ade92836ba6eea6a6ceaa798bf2f/a4d8b/images/icons/icon-set-facets.svg"
                                className="icon" alt="Facet button"/></button>
                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle"
                                 onClick={() => setSearchFT(!searchFT)}>
                                {searchFT ? (<span className="hcFacetGroup">&#9660; search</span>) : (
                                    <span className="hcFacetGroup">&#9658; search</span>
                                )}
                            </div>
                            {searchFT ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <SearchFreeText/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; date</span>) : (
                                    <span className="hcFacetGroup">&#9658; date</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => setGeoFacet(!geoFacet)}>
                                {geoFacet ? (<span className="hcFacetGroup">&#9660; geo location</span>) : (
                                    <span className="hcFacetGroup">&#9658; geo location</span>)}
                            </div>
                            {geoFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <GeoNameFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; STANDARD NAMES</span>) : (
                                    <span className="hcFacetGroup">&#9658; STANDARD NAMES</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; COMMODITIES</span>) : (
                                    <span className="hcFacetGroup">&#9658; COMMODITIES</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}
                        </div>

                        <div className="hcLayoutResults">
                            <div className="hcResultsHeader hcMarginBottom1">
                                <div className="hcNumberFound">Manuscripts found: 33</div>
                                {/*<div><select value="">
                                    <option value="schipper_achternaam.raw">Order by family name</option>
                                    <option value="jaar">Order by year</option>
                                    <option value="schipper_plaatsnaam.raw">Order by home port</option>
                                </select></div>*/}
                            </div>
                            <div className="hcMarginBottom2">
                                <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets: <span
                                    className="hcFacetReset hcClickable">Reset facets</span>
                                </div>
                                <span className="hcSelectedFacet"><span
                                    className="hcSelectedFacetType">None</span></span>
                            </div>
                            <ManuscriptList/>
                            <div className="hcPagination">
                                <div className="hcClickable"> Previous</div>
                                <div className="hcClickable">Next &#8594;</div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}