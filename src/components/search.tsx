import React, {useEffect} from "react";
import Header from "../page/header";
import Footer from "../page/footer";
import ManuscriptList from "./manuscriptList";
import {useState} from "react";
import SearchFreeText from "../facets/searchFreeText";
import GeoNameFacet from "../facets/geoNameFacet";
import AbsolutePlaceFacet from "../facets/absolutePlaceFacet";
import DatelabelFacet from "../facets/dateLabelFacet";
import DatePeriodFacet from "../facets/dataPeriodFacet";
import FiltersFacet from "../facets/filtersFacet";
import BookFacet from "../facets/bookFacet";
import PageDimensionsFacet from "../facets/pageDimensions";


export default function Search() {
    const dummyFacets: boolean = false;
    const [searchFT, setSearchFT] = useState(false);
    const [geoFacet, setGeoFacet] = useState(false);
    const [dateLabelFacet, setDatelabelFacet] = useState(false);
    const [bookFacet, setBookFacet] = useState(false);
    const [dimFacet, setDimFacet] = useState(false);
    const [filterFacet, setFilterFacet] = useState(false);

    const cross: string = "[x]";

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

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle"
                                 onClick={() => setDatelabelFacet(!dateLabelFacet)}>
                                {dateLabelFacet ? (<span className="hcFacetGroup">&#9660; date of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; date of origin</span>)}
                            </div>
                            {dateLabelFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <DatelabelFacet/>
                                    <DatePeriodFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle"
                                 onClick={() => setGeoFacet(!geoFacet)}>
                                {geoFacet ? (<span className="hcFacetGroup">&#9660; place of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; place of origin</span>)}
                            </div>
                            {geoFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <GeoNameFacet/>
                                    <AbsolutePlaceFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; region of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; region of origin</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                    <span className="hcFacetGroup">&#9658; provenance</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => setDimFacet(!dimFacet)}>
                                {dimFacet ? (<span className="hcFacetGroup">&#9660; page dimensions</span>) : (
                                    <span className="hcFacetGroup">&#9658; page dimensions</span>)}
                            </div>
                            {dimFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <PageDimensionsFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; layout</span>) : (
                                    <span className="hcFacetGroup">&#9658; layout</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; physical state</span>) : (
                                    <span className="hcFacetGroup">&#9658; physical state</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; material format</span>) : (
                                    <span className="hcFacetGroup">&#9658; material format</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setBookFacet(!bookFacet)
                            }}>
                                {bookFacet ? (<span className="hcFacetGroup">&#9660; books</span>) : (
                                    <span className="hcFacetGroup">&#9658; books</span>)}
                            </div>
                            {bookFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <BookFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; book type</span>) : (
                                    <span className="hcFacetGroup">&#9658; book type</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; author</span>) : (
                                    <span className="hcFacetGroup">&#9658; author</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; script</span>) : (
                                    <span className="hcFacetGroup">&#9658; script</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {setFilterFacet(!filterFacet)}}>
                                {filterFacet ? (<span className="hcFacetGroup">&#9660; other filters</span>) : (
                                    <span className="hcFacetGroup">&#9658; other filters</span>)}
                            </div>
                            {filterFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <FiltersFacet/>
                                </div>) : (<div/>)}

                            {/* <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                    <span className="hcFacetGroup">&#9658; provenance</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle">
                                {dummyFacets ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                    <span className="hcFacetGroup">&#9658; provenance</span>)}
                            </div>
                            {dummyFacets ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">

                                </div>) : (<div/>)}*/}


                        </div>

                        <div className="hcLayoutResults">

                            <div className="hcResultsHeader hcMarginBottom1">
                                <div className="hcNumberFound">Manuscripts found: 78</div>
                                {/*<div><select value="">
                                    <option value="schipper_achternaam.raw">Order by family name</option>
                                    <option value="jaar">Order by year</option>
                                    <option value="schipper_plaatsnaam.raw">Order by home port</option>
                                </select></div>*/}
                            </div>
                            <div className="hcMarginBottom2">
                                <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets: <span
                                    className="hcFacetReset hcClickable">Reset facets - Download results</span>
                                </div>
                                <span className="hcSelectedFacet"><span
                                    className="hcSelectedFacetType">Page dimensions: </span>
                                <div className="hcFacetValues">501 - 550 mm {cross}</div>
                                    <div className="hcFacetValues">unknown {cross}</div>
                                </span>
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