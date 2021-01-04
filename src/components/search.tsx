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
import {IResultManuscriptList, ISearchObject, ISendCandidate, IFacetCandidate, ISearchValues, IRemoveFacet, IResetFacets} from "../misc/interfaces";
import {SERVICE_SERVER} from "../misc/config";
import {Base64} from "js-base64";
import IsiMap from "../elements/map";
import DummySliderFacet from "../facets/dummySliderfacet";


export default function Search(props: {search_string: string}) {
    let searchBuffer: ISearchObject = {
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
    };

    if (props.search_string !== "none") {
        try {
            searchBuffer = JSON.parse(Base64.fromBase64(props.search_string)) as ISearchObject;
        } catch (Error) {
            window.scroll(0, 0);
            window.location.href = "/";
        }

    }

    const [searchFT, setSearchFT] = useState(searchBuffer.facetstate.search);
    const [geoFacet, setGeoFacet] = useState(searchBuffer.facetstate.geo);
    const [dateLabelFacet, setDatelabelFacet] = useState(searchBuffer.facetstate.dateLabel);
    const [bookFacet, setBookFacet] = useState(searchBuffer.facetstate.book);
    const [dimFacet, setDimFacet] = useState(searchBuffer.facetstate.dimensions);
    const [filterFacet, setFilterFacet] = useState(searchBuffer.facetstate.filters);
    const [physicalStateFacet, setPhysicalStatefacet] = useState(searchBuffer.facetstate.physicalState);
    const [scriptFacet, setScriptFacet] = useState(searchBuffer.facetstate.script);
    const [manuscriptFacet, setManuscriptFacet] = useState(searchBuffer.facetstate.manuscript);
    const [layoutFacet, setLayoutFacet] = useState(searchBuffer.facetstate.layout);
    const [transmittedFacet, setTransmittedFacet] = useState(searchBuffer.facetstate.transmitted);
    const [provenanceFacet, setProvenanceFacet] = useState(searchBuffer.facetstate.provenance);
    const [authorFacet, setAuthorFacet] = useState(searchBuffer.facetstate.authors);
    const [currentPlaceFacet, setCurrentPlaceFacet] = useState(searchBuffer.facetstate.currentplace);
    const [regionFacet, setRegionFacet] = useState(searchBuffer.facetstate.region);
    const [refresh, setRefresh] = useState(false);
    const [searchData, setSearchData] = useState<ISearchObject>(searchBuffer);



    const cross: string = "[x]";
    let facets: ISearchValues[] = [];
    if (typeof searchBuffer.searchvalues === "object") {
        facets = searchBuffer.searchvalues as ISearchValues[];
    }

    const [loading, setLoading] = useState(true);
    const [result, setResult] = useState<IResultManuscriptList>({amount: 0, pages: 0, manuscripts: []});

    async function fetchData() {
        const url = SERVICE_SERVER + "search/" + Base64.toBase64(JSON.stringify(searchData));
        const response = await fetch(url);
        const json: IResultManuscriptList = await response.json();
        setResult(json);
        setLoading(false);
    }

    const removeFacet: IRemoveFacet = (field: string, value: string) => {
        let searchBuffer: ISearchObject = searchData;
        if (typeof searchBuffer.searchvalues === "object") {
            searchBuffer.searchvalues.forEach((item: ISearchValues) => {
                if (item.name === field) {
                    item.values = item.values.filter((element => element !== value));
                }
            })
            searchBuffer.searchvalues = searchBuffer.searchvalues.filter(function (el) {
                return el.values.length > 0
            });
            if (searchBuffer.searchvalues.length === 0) {
                searchBuffer.searchvalues = "none";
            }
        }
        setSearchData(searchBuffer);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
    }

    function openWindow(ref: string) {
        let a= document.createElement('a');
        a.target= '_blank';
        a.href= ref;
        a.click();
    }

    const resetFacets: IResetFacets = () => {
        let searchBuffer: ISearchObject = searchData;
        searchBuffer.page = 1;
        searchBuffer.searchvalues = "none";
        setSearchData(searchBuffer);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
    }



    const sendCandidate: ISendCandidate = (candidate: IFacetCandidate) => {
        let searchBuffer: ISearchObject = searchData;
        if (searchData.searchvalues === "none") {
            searchBuffer.searchvalues = [{
                name: candidate.facet,
                field: candidate.field,
                values: [candidate.candidate]
            } as ISearchValues];
            setSearchData(searchData);
            window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
            setRefresh(!refresh);
        } else {
            if (typeof searchBuffer.searchvalues === "object") {
                let found: boolean = false;
                searchBuffer.searchvalues.forEach((item) => {
                    if (item.name === candidate.facet) {
                        found = true;
                        if (!item.values.includes(candidate.candidate)) {
                            item.values.push(candidate.candidate);
                        }
                    }
                });
                if (!found) {
                    searchBuffer.searchvalues.push({
                        name: candidate.facet,
                        field: candidate.field,
                        values: [candidate.candidate]
                    });
                }
            }
            searchBuffer.page = 1;
            setSearchData(searchData);
            window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
            setRefresh(!refresh);
            window.scroll(0, 0);
        }
    }


    function setPageLength(amount: string) {
        let sd = searchData;
        sd.page = 1;
        sd.page_length = parseInt(amount);
        setSearchData(sd);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
    }

    function nextPage() {
        goToPage(searchData.page + 1);
    }

    function prevPage() {
        if (searchData.page > 0) {
            goToPage(searchData.page - 1);
        }

    }

    function goToPage(page: number) {
        let sd = searchData;
        sd.page = page;
        setSearchData(sd);
        window.location.href = "#search/" + Base64.toBase64(JSON.stringify(searchData));
        setRefresh(!refresh);
        window.scroll(0, 0);
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
                            <div className="hcFacetSubDivision"
                                 onClick={() => setSearchFT(!searchFT)}>
                                {searchFT ? (<span className="hcFacetGroup">&#9660; search</span>) : (
                                    <span className="hcFacetGroup">&#9658; search</span>
                                )}
                            </div>
                            {searchFT ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <SearchFreeText  add={sendCandidate}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" onClick={() => {
                                setCurrentPlaceFacet(!currentPlaceFacet);
                            }}>
                                {currentPlaceFacet ? (<span className="hcFacetGroup">&#9660; current place</span>) : (
                                    <span className="hcFacetGroup">&#9658; current place</span>)}
                            </div>
                            {currentPlaceFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <CurrentPlaceFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}
                            <div className="hcFacetSubDivision"
                                 onClick={() => setDatelabelFacet(!dateLabelFacet)}>
                                {dateLabelFacet ? (<span className="hcFacetGroup">&#9660; date of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; date of origin</span>)}
                            </div>
                            {dateLabelFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <DatelabelFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                    <DummySliderFacet/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision"
                                 onClick={() => setGeoFacet(!geoFacet)}>
                                {geoFacet ? (<span className="hcFacetGroup">&#9660; place of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; place of origin</span>)}
                            </div>
                            {geoFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <GeoNameFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                    <AbsolutePlaceFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setRegionFacet(!regionFacet);
                            }}>
                                {regionFacet ? (<span className="hcFacetGroup">&#9660; region of origin</span>) : (
                                    <span className="hcFacetGroup">&#9658; region of origin</span>)}
                            </div>
                            {regionFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <RegionFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setProvenanceFacet(!provenanceFacet);
                            }}>
                                {provenanceFacet ? (<span className="hcFacetGroup">&#9660; provenance</span>) : (
                                    <span className="hcFacetGroup">&#9658; provenance</span>)}
                            </div>
                            {provenanceFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ProvenanceFacet parentCallback={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle"
                                 onClick={() => setDimFacet(!dimFacet)}>
                                {dimFacet ? (<span className="hcFacetGroup">&#9660; page dimensions</span>) : (
                                    <span className="hcFacetGroup">&#9658; page dimensions</span>)}
                            </div>
                            {dimFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <PageDimensionsFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setLayoutFacet(!layoutFacet);
                            }}>
                                {layoutFacet ? (<span className="hcFacetGroup">&#9660; layout</span>) : (
                                    <span className="hcFacetGroup">&#9658; layout</span>)}
                            </div>
                            {layoutFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <LayoutFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setPhysicalStatefacet(!physicalStateFacet);
                            }}>
                                {physicalStateFacet ? (<span className="hcFacetGroup">&#9660; physical state</span>) : (
                                    <span className="hcFacetGroup">&#9658; physical state</span>)}
                            </div>
                            {physicalStateFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <PhysicalStateFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}


                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setTransmittedFacet(!transmittedFacet);
                            }}>
                                {transmittedFacet ? (
                                    <span className="hcFacetGroup">&#9660; etym. transmitted as</span>) : (
                                    <span className="hcFacetGroup">&#9658; etym. transmitted as</span>)}
                            </div>
                            {transmittedFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <TransmittedFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}
                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setBookFacet(!bookFacet)
                            }}>
                                {bookFacet ? (<span className="hcFacetGroup">&#9660; books</span>) : (
                                    <span className="hcFacetGroup">&#9658; books</span>)}
                            </div>
                            {bookFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <BookFacet add={sendCandidate}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" id="shipmasterFacetsTitle" onClick={() => {
                                setManuscriptFacet(!manuscriptFacet);
                            }}>
                                {manuscriptFacet ? (<span className="hcFacetGroup">&#9660; manuscript type</span>) : (
                                    <span className="hcFacetGroup">&#9658; manuscript type</span>)}
                            </div>
                            {manuscriptFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ManuscriptTypeFacet  add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" onClick={() => {
                                setAuthorFacet(!authorFacet);
                            }}>
                                {authorFacet ? (<span className="hcFacetGroup">&#9660; author / text / types</span>) : (
                                    <span className="hcFacetGroup">&#9658; author / text / types</span>)}
                            </div>
                            {authorFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <AuthorFacet parentCallback={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" onClick={() => {
                                setScriptFacet(!scriptFacet);
                            }}>
                                {scriptFacet ? (<span className="hcFacetGroup">&#9660; script</span>) : (
                                    <span className="hcFacetGroup">&#9658; script</span>)}
                            </div>
                            {scriptFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <ScriptFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}

                            <div className="hcFacetSubDivision" onClick={() => {
                                setFilterFacet(!filterFacet)
                            }}>
                                {filterFacet ? (<span className="hcFacetGroup">&#9660; other filters</span>) : (
                                    <span className="hcFacetGroup">&#9658; other filters</span>)}
                            </div>
                            {filterFacet ? (
                                <div className="hcLayoutFacetsToggle" id="hcLayoutFacetsToggle">
                                    <FiltersFacet add={sendCandidate} search={searchData} refresh={refresh}/>
                                </div>) : (<div/>)}
                        </div>

                        <div className="hcLayoutResults">
                            <div className="hcResultsHeader hcMarginBottom1">
                                <div className="hcNumberFound">Manuscripts found: {result.amount} - Page {searchData.page} of {result.pages}</div>
                                <div><select value={searchData.page_length} className="hcAmountOfPages"
                                             onChange={(e) => setPageLength(e.target.value)}>
                                    <option value={20}>20 manuscripts per page</option>
                                    <option value={50}>50 manuscripts per page</option>
                                    <option value={100}>100 manuscripts per page</option>
                                </select></div>
                            </div>
                            <div className="hcMarginBottom2">
                                <div className="hcSmallTxt hcTxtColorGreyMid">Selected facets:
                                    {searchData.searchvalues !== "none" && result.amount > 0 && <span
                                        className="hcFacetReset hcClickable" onClick={() => {openWindow(SERVICE_SERVER + "download/" + Base64.toBase64(JSON.stringify(searchData)))}}>Download results</span>}
                                    <span
                                    className="hcFacetReset hcClickable" onClick={resetFacets}>Reset facets</span>
                                </div>
                                {searchData.searchvalues === "none" ? (
                                    <span className="hcSelectedFacet"><span
                                        className="hcSelectedFacetType">None</span></span>
                                ) : (
                                    facets.map((item: ISearchValues) => {
                                        return (
                                            <span className="hcSelectedFacet"><span
                                                className="hcSelectedFacetType">{item.name}: </span>
                                                {item.values.map(function (skipper, i) {
                                                    return (<div className="hcFacetValues" key={i}
                                                                 onClick={() => removeFacet(item.name, skipper)}>{skipper} {cross} </div>)
                                                })}
                                    </span>
                                        )
                                    })
                                )}
                            </div>
                            {loading ? (<div>Loading...</div>) : (
                                <div>
                                    <IsiMap result={result}/>
                                    <ManuscriptList result={result}/>
                                    <div className="hcPagination">
                                        {searchData.page > 1 ? (<div className="hcClickable" onClick={() => {prevPage()}}>&#8592; Previous</div>) : (<div/>)}
                                        {searchData.page < result.pages ? (<div className="hcClickable" onClick={() => {nextPage()}}>Next &#8594;</div>) : (<div/>)}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}