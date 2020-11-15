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
import PhysicalStateFacet from "../facets/physicalStateFacet";
import ScriptFacet from "../facets/scriptFacet";
import ManuscriptTypeFacet from "../facets/manuscriptType";
import LayoutFacet from "../facets/layoutFacet";
import TransmittedFacet from "../facets/transmittedFacet";
import ProvenanceFacet from "../facets/provenanceFacet";
import AuthorFacet from "../facets/authorFacet";
import CurrentPlaceFacet from "../facets/currentPlaceFacet";
import RegionFacet from "../facets/regionFacet";
import {IResultManuscriptList, ISearchObject} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";



export default function Search() {
    const [searchFT, setSearchFT] = useState(true);
    const [geoFacet, setGeoFacet] = useState(false);
    const [dateLabelFacet, setDatelabelFacet] = useState(false);
    const [bookFacet, setBookFacet] = useState(false);
    const [dimFacet, setDimFacet] = useState(false);
    const [filterFacet, setFilterFacet] = useState(false);
    const [physicalStateFacet, setPhysicalStatefacet] = useState(false);
    const [scriptFacet, setScriptFacet] = useState(false);
    const [manuscriptFacet, setManuscriptFacet] = useState(false);
    const [layoutFacet, setLayoutFacet] = useState(false);
    const [transmittedFacet, setTransmittedFacet] = useState(false);
    const [provenanceFacet, setProvenanceFacet] = useState(false);
    const [authorFacet, setAuthorFacet] = useState(false);
    const [currentPlaceFacet, setCurrentPlaceFacet] = useState(false);
    const [regionFacet, setRegionFacet] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [searchData, setSearchData] = useState<ISearchObject>({
        facetstate: {
            search: true,
            geo: false,
            dateLabel: false,
            book: false,
            dimensions: false,
            filters: false,
            physicalState: false,
            script: false,
            manuscript: false,
            layout: false,
            transmitted: false,
            provenance: false,
            authors: false,
            currentplace: false,
            region: false
        },
        searchvalues: "none",
        page: 1,
        page_length: 20,
        sortorder: ""
    });

    const cross: string = "[x]";

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IResultManuscriptList>({amount: 0, pages: 0, manuscripts: []});

    async function fetchData() {
        const url = SERVICE_SERVER + "search/" + Base64.toBase64(JSON.stringify(searchData));
        const response = await fetch(url);
        const json: IResultManuscriptList  = await response.json();
        setResult(json);
        setLoading(false);
    }

    function setPageLength(amount:string) {
        let sd = searchData;
        sd.page = 1;
        sd.page_length = parseInt(amount);
        setSearchData(sd);
        setRefresh(!refresh);
    }

    useEffect(() => {
        fetchData();
    }, [refresh]);

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

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setCurrentPlaceFacet(!currentPlaceFacet);
                            }}>
                                {currentPlaceFacet ? (<span className="hcFacetGroup">&#9660; current place</span>) : (
                                    <span className="hcFacetGroup">&#9658; current place</span>)}
                            </div>
                            {currentPlaceFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <CurrentPlaceFacet/>
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

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setRegionFacet(!regionFacet);
                            }}>
                                {regionFacet ? (<span className="hcFacetGroup">&#9660; region of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; region of origin</span>)}
                            </div>
                            {regionFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <RegionFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setProvenanceFacet(!provenanceFacet);
                            }}>
                                {provenanceFacet ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                    <span className="hcFacetGroup">&#9658; provenance</span>)}
                            </div>
                            {provenanceFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ProvenanceFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => setDimFacet(!dimFacet)}>
                                {dimFacet ? (<span className="hcFacetGroup">&#9660; page dimensions</span>) : (
                                    <span className="hcFacetGroup">&#9658; page dimensions</span>)}
                            </div>
                            {dimFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <PageDimensionsFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setLayoutFacet(!layoutFacet);
                            }}>
                                {layoutFacet ? (<span className="hcFacetGroup">&#9660; layout</span>) : (
                                    <span className="hcFacetGroup">&#9658; layout</span>)}
                            </div>
                            {layoutFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <LayoutFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setPhysicalStatefacet(!physicalStateFacet);
                            }}>
                                {physicalStateFacet ? (<span className="hcFacetGroup">&#9660; physical state</span>) : (
                                    <span className="hcFacetGroup">&#9658; physical state</span>)}
                            </div>
                            {physicalStateFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <PhysicalStateFacet/>
                                </div>) : (<div/>)}


                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setTransmittedFacet(!transmittedFacet);
                            }}>
                                {transmittedFacet ? (<span className="hcFacetGroup">&#9660; etym. transmitted as</span>) : (
                                    <span className="hcFacetGroup">&#9658; etym. transmitted as</span>)}
                            </div>
                            {transmittedFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <TransmittedFacet/>
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

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setManuscriptFacet(!manuscriptFacet);
                            }}>
                                {manuscriptFacet ? (<span className="hcFacetGroup">&#9660; manuscript type</span>) : (
                                    <span className="hcFacetGroup">&#9658; manuscript type</span>)}
                            </div>
                            {manuscriptFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ManuscriptTypeFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setAuthorFacet(!authorFacet);
                            }}>
                                {authorFacet ? (<span className="hcFacetGroup">&#9660; author / text / types</span>) : (
                                    <span className="hcFacetGroup">&#9658; author / text / types</span>)}
                            </div>
                            {authorFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <AuthorFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setScriptFacet(!scriptFacet);
                            }}>
                                {scriptFacet ? (<span className="hcFacetGroup">&#9660; script</span>) : (
                                    <span className="hcFacetGroup">&#9658; script</span>)}
                            </div>
                            {scriptFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ScriptFacet/>
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
                                <div className="hcNumberFound">Manuscripts found: 447</div>
                                <div><select value={searchData.page_length} className="hcAmountOfPages" onChange={(e) => setPageLength(e.target.value)}>
                                    <option value={10}>10 manuscripts per page</option>
                                    <option value={20}>20 manuscripts per page</option>
                                    <option value={50}>50 manuscripts per page</option>
                                    <option value={100}>100 manuscripts per page</option>
                                </select></div>
                            </div>
                            <div className="hcMarginBottom2">
                                <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets: <span
                                    className="hcFacetReset hcClickable">Reset facets - Download results</span>
                                </div>
                                <span className="hcSelectedFacet"><span
                                    className="hcSelectedFacetType">None</span>
                                <div className="hcFacetValues"></div>
                                    <div className="hcFacetValues"></div>
                                </span>
                            </div>
                            {loading ? (<div>Loading...</div>) : (<ManuscriptList result = {result} />)}

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